type Case = string | number
type ConditionObject<T extends Case, V> = { [k in T]: V }
type ConditionArray<T extends Case, V> = [cases: T | T[], value: V][]
type Conditions<T extends Case, V> = ConditionObject<T, V> | ConditionArray<T, V>

function choose<T extends Case, V>(predicate: T, conditions: ConditionArray<T, V>): V | undefined
function choose<T extends Case, V>(predicate: T, conditions: ConditionObject<T, V>): V
function choose<T extends Case, V>(
  predicate: T,
  defaultValue: V,
  conditions: Partial<ConditionObject<T, V>>
): V
function choose<T extends Case, V>(predicate: T, defaultValue: V, conditions: Conditions<T, V>): V
function choose<T extends Case, V>(
  predicate: T,
  defaultValue: V | Conditions<T, V>,
  conditions?: V | Conditions<T, V>
) {
  if (arguments.length === 2) {
    conditions = defaultValue
    defaultValue = undefined as any
  }
  if (!Array.isArray(conditions)) {
    return predicate in conditions! ? (<ConditionObject<T, V>>conditions)[predicate] : defaultValue
  }
  for (const [cases, value] of conditions) {
    if (Array.isArray(cases)) {
      if (cases.includes(predicate)) return value
    } else if (cases === predicate) return value
  }
  return defaultValue
}

export default choose
