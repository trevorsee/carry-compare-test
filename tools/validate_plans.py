#!/usr/bin/env python3
"""
MVP schema validator for site/data/plans.json

Goals:
- Catch missing required fields
- Ensure statuses are one of: known/unknown/not_disclosed/varies
- Ensure attribute ids referenced by plans exist in themes
- Ensure enum values exist in taxonomies when status=known
- Ensure sources have url/title, and lastVerified uses YYYY-MM-DD when provided
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Dict, List, Set, Tuple


DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ALLOWED_STATUS = {"known", "unknown", "not_disclosed", "varies"}


@dataclass
class Problem:
    path: str
    msg: str


def is_obj(x: Any) -> bool:
    return isinstance(x, dict)


def is_list(x: Any) -> bool:
    return isinstance(x, list)


def add(problems: List[Problem], path: str, msg: str) -> None:
    problems.append(Problem(path=path, msg=msg))


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def index_attributes(data: Dict[str, Any]) -> Dict[str, Dict[str, Any]]:
    out: Dict[str, Dict[str, Any]] = {}
    for ti, theme in enumerate(data.get("themes", [])):
        for ai, attr in enumerate(theme.get("attributes", [])):
            attr_id = attr.get("id")
            if isinstance(attr_id, str) and attr_id:
                out[attr_id] = attr
    return out


def index_taxonomies(data: Dict[str, Any]) -> Dict[str, Set[str]]:
    tax: Dict[str, Set[str]] = {}
    taxonomies = data.get("taxonomies", {})
    if not is_obj(taxonomies):
        return tax
    for key, items in taxonomies.items():
        if not is_list(items):
            continue
        ids: Set[str] = set()
        for it in items:
            if is_obj(it) and isinstance(it.get("id"), str):
                ids.add(it["id"])
        tax[key] = ids
    return tax


def validate_field(
    *,
    problems: List[Problem],
    base_path: str,
    field: Any,
    attr: Dict[str, Any] | None,
    tax_ids: Dict[str, Set[str]],
) -> None:
    if not is_obj(field):
        add(problems, base_path, "Field must be an object")
        return
    status = field.get("status")
    if status not in ALLOWED_STATUS:
        add(problems, base_path + ".status", f"Invalid status: {status!r}")
    if "lastVerified" in field:
        lv = field.get("lastVerified")
        if not (isinstance(lv, str) and DATE_RE.match(lv)):
            add(problems, base_path + ".lastVerified", "lastVerified must be YYYY-MM-DD")
    sources = field.get("sources", [])
    if sources is not None and not is_list(sources):
        add(problems, base_path + ".sources", "sources must be an array")
    if is_list(sources):
        for si, s in enumerate(sources):
            sp = f"{base_path}.sources[{si}]"
            if not is_obj(s):
                add(problems, sp, "source must be an object")
                continue
            if not isinstance(s.get("url"), str) or not s["url"]:
                add(problems, sp + ".url", "source.url required")
            if "title" in s and s["title"] is not None and not isinstance(s["title"], str):
                add(problems, sp + ".title", "source.title must be a string when provided")

    if status == "known":
        if "value" not in field:
            add(problems, base_path + ".value", "status=known requires a value")

        if attr and isinstance(attr.get("type"), str) and attr["type"].startswith("enum:"):
            tax_key = attr["type"].split(":", 1)[1]
            allowed = tax_ids.get(tax_key, set())
            v = field.get("value")
            if not isinstance(v, str):
                add(problems, base_path + ".value", "enum value must be a string id")
            elif v not in allowed:
                add(problems, base_path + ".value", f"Unknown enum id {v!r} for taxonomy {tax_key!r}")


def validate(data: Any) -> Tuple[bool, List[Problem]]:
    problems: List[Problem] = []
    if not is_obj(data):
        return False, [Problem(path="$", msg="Root must be an object")]

    themes = data.get("themes")
    plans = data.get("plans")
    taxonomies = data.get("taxonomies")
    if not is_list(themes):
        add(problems, "$.themes", "themes must be an array")
    if not is_list(plans):
        add(problems, "$.plans", "plans must be an array")
        return False, problems
    if not is_obj(taxonomies):
        add(problems, "$.taxonomies", "taxonomies must be an object")

    attr_index = index_attributes(data)
    tax_ids = index_taxonomies(data)

    seen_plan_ids: Set[str] = set()
    for pi, plan in enumerate(plans):
        pp = f"$.plans[{pi}]"
        if not is_obj(plan):
            add(problems, pp, "plan must be an object")
            continue

        plan_id = plan.get("id")
        if not isinstance(plan_id, str) or not plan_id:
            add(problems, pp + ".id", "id required")
        else:
            if plan_id in seen_plan_ids:
                add(problems, pp + ".id", f"duplicate id {plan_id!r}")
            seen_plan_ids.add(plan_id)

        provider = plan.get("provider")
        if not is_obj(provider) or not isinstance(provider.get("name"), str) or not provider.get("name"):
            add(problems, pp + ".provider.name", "provider.name required")

        if not isinstance(plan.get("planName"), str) or not plan.get("planName"):
            add(problems, pp + ".planName", "planName required")

        availability = plan.get("availability", {})
        if availability is not None:
            if not is_obj(availability):
                add(problems, pp + ".availability", "availability must be an object when present")
            else:
                avs = availability.get("status", "unknown")
                if avs not in ALLOWED_STATUS:
                    add(problems, pp + ".availability.status", f"Invalid status: {avs!r}")

        fields = plan.get("fields")
        if not is_obj(fields):
            add(problems, pp + ".fields", "fields object required")
            continue

        for field_id, field in fields.items():
            if not isinstance(field_id, str):
                add(problems, pp + ".fields", "field ids must be strings")
                continue
            if field_id not in attr_index:
                add(problems, f"{pp}.fields.{field_id}", "field id not present in themes/attributes")
                attr = None
            else:
                attr = attr_index[field_id]

            validate_field(
                problems=problems,
                base_path=f"{pp}.fields.{field_id}",
                field=field,
                attr=attr,
                tax_ids=tax_ids,
            )

    ok = len(problems) == 0
    return ok, problems


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: python3 tools/validate_plans.py site/data/plans.json", file=sys.stderr)
        return 2

    path = Path(sys.argv[1])
    if not path.exists():
        print(f"File not found: {path}", file=sys.stderr)
        return 2

    data = load_json(path)
    ok, problems = validate(data)
    if ok:
        print("OK: plan dataset validated")
        return 0

    print(f"INVALID: {len(problems)} problem(s)")
    for p in problems:
        print(f"- {p.path}: {p.msg}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())

