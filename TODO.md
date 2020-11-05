

- il manque une section "why this lib" dans ton readme, pour expliquer pourquoi cette lib existe, quel problème elle résout.

- exemples: changer très légèrement le nommage pour rendre plus explicite ce que font les morceaux de code: 

```js
const effectName = 'effectName'

function DynamicallyThemedButtonComponent({ label }) {
  const theme = perform(effectName)

  return ...
```

- API reference : explain when each element should be used

- uglify performSafe to explain it's supposed to be library code, for special use cases

- éviter les computed properties (`[logEff]`) dans les exemples, le code a l'air trop alien sinon
