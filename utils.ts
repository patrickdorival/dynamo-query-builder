import { BuilderType } from './builder'

// Might want to separate this out to 'formatters' file in future
/** Format a value that is valid for query builder type */
export const formatValue = (builderType: BuilderType, value: any) => {
  switch (builderType) {
    case BuilderType.DynamoDB:
      const type = getType(value)
      return { [type]: value }
    default:
      return value // DocumentClient is already good to go
  }
}

/** Map a variable to an AWS type */
export const getType = (variable: any) => {
  const variableType = typeof variable
  switch (variableType) {
    case 'boolean': return 'BOOL'
    case 'string': return 'S'
    case 'number': return 'N'
    case 'object': // Special cases
      if (Buffer.isBuffer(variable)) { return 'B' }
    // If none of the above, fallthrough to string
    default: return 'S'
  }
}

/** Simple way to check if the object is empty */
export const isEmpty = (object: object) => {
  return (Object.keys(object).length === 0)
}
