# Loop3r
 Rappel projet : Loop3r est une plateforme permettant d'obtenir du cashback en crypto en achetant en FIAT les produits des partenaires d'un évènement.  
Nous sommes partis de ce hackathon comme usecase et avons trouvé des partenaires prêts à proposer des produits, que nous avons référencés.

## Stack technique
- Frontend  
Nous avons conçu un frontend en React + Next.js déployé sur Vercel, vous pouvez le consultez ici : https://tezos-hackathon-2023.vercel.app/ .  
  - les pages principales sont
    - index.tsx
    - partners.tsx
    - overlay
    - toute la 3D est dans le dossier canvas

- Backend
Le backend est en PostgresQL, déployé sur AWS, accessible ici `https://siahackaton.reskue-art.com`,
  - nous avons une table user, évènement, partenaire, produit

- Autre  
Nous avons utilisé un canvas 3D avec Three.Js, Fiber et Drei. Zustand pour la gestion de states. Tailwind CSS et material UI.
- Axes d'amélioration
  - Nous avons intégré web3auth pour une authentification mais en prod la modale de connexion ne se lance pas alors que nous avons whitelisté l'url
  - Finalisation de l'intégration de l'api Stripe, le process fonctionne pour chaque produit, cependant il faut générer la page de success lorsque le paiement est validé par Stripe
