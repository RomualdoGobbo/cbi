1- Refactory traversal system (ElementDef) - 1
  * Create type dictionary [done]
  * Add basic support for types (number, date) [done]
  * Add support for array types [done]
  * Add support for ElementWrapper types [done]

2- Refactor transactions and payment infos. Both SDDs and SCTs transactions and payments
have common fields that can be superclassed.

2b - Refactor more traversal system:
  * - Add real support for attributes (harder than it looks)
  * - all types should be element wrappers


4- Find a way to make ElementDefs inherit. (Maybe use annotations on class fields?- would break ordering)
