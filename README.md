# Regenscan

Regenscan was designed to fill a gap in block explorers supporting [Regen Network](https://regen.network), focusing on two main use cases:

- **Transparent credit management & issuance**: Exposing main info
  and verifaible metadata for the credit classes, projects, and credit
  batches that make up the core of Regen Network's ecological
  crediting platform

- **Anchored datasets**: Providing full visilibity into datasets
  registered on Regen Network's data attestation network. This
  includes the dataset's Regen IRI (a content hash based identifier),
  the full RDF dataset (for public datasets), as well as any
  attestations and data resolvers linked to the given dataset.

## Contributing

Contributions, PRs, feature requests, are all welcome!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages by by directly modifying `app/*.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
