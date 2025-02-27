import axios from "axios";
import { CreditClass } from "@/utils/types";
import React from "react";
import MetadataLink from "@/components/MetadataLink";
import AddressLink from "@/components/AddressLink";
import SeeMore from "@/components/SeeMore";
import { InfoTable, KeyColumn, ValueColumn } from "@/components/InfoTable";
import ResolvedMetadata from "@/components/ResolvedMetadata";
import Header from "@/components/Header";

export default async function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Header />
      <h3 className="mt-2 mb-4 text-xl text- font-semibold">About</h3>
      <div className="text-md">
        Regenscan was designed to fill a gap in block explorers supporting{" "}
        <a href="https://app.regen.network">Regen Network</a>, focusing on two
        main use cases:
        <ul className="list-disc ml-8">
          <li>
            <b>Transparent credit management & issuance</b>: Exposing main info
            and verifaible metadata for the credit classes, projects, and credit
            batches that make up the core of Regen Network's ecological
            crediting platform
          </li>
          <li>
            <b>Anchored datasets</b>: Providing full visilibity into datasets
            registered on Regen Network's data attestation network. This
            includes the dataset's Regen IRI (a content hash based identifier),
            the full RDF dataset (for public datasets), as well as any
            attestations and data resolvers linked to the given dataset.
          </li>
        </ul>
        <br />
        Traditional block explorers such as{" "}
        <a href="https://www.mintscan.io/regen" target="_blank">
          Mintscan
        </a>{" "}
        are great tools for viewing raw blockchain data such as transactions,
        blocks, validators, and Regen Network's on-chain governance (e.g.,
        proposals, voting, etc.). However, they lack many features necessary for
        supporting some of the key constituents of Regen Network — ecocredit
        builders, and ecosystem partners.
        <br />
        <br />
        If you're looking for a technical tool to explore the various ecological
        datasets and ecological assets on Regen Network, we hope that Regenscan
        can serve as this companion — helping you navigate the many existing
        ecological regeneration projects that leverage Regen Network for data
        transparency and auditabiltiy of ecological claims.
        <br />
        <br />
        Feature requests, bug reports, and PRs welcome on{" "}
        <a
          href="https://github.com/clevinson/regenscan/issues/new"
          target="_blank"
        >
          GitHub
        </a>
        <br />
        <br />
        Built and maintained by{" "}
        <a href="https://github.com/clevinson" target="_blank">
          @clevinson
        </a>{" "}
        🌴✌️
      </div>
    </div>
  );
}
