import React from "react";

interface AddressLinkProps {
  address: string;
}

const AddressLink = ({ address }: AddressLinkProps) => {
  return (
    <div className="inline-block space-x-1 bg-gray-100 border border-gray-300 text-xs px-1 py-0.5 rounded-lg">
      <div className="text-gray-600 truncate inline-block max-w-48 md:max-w-none align-middle">
        {address}
      </div>
      <a
        href={`https://app.regen.network/profiles/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-3 inline-block align-middle"
      >
        <img src="/images/regen-app.png" alt="Regen" />
      </a>
      <a
        href={`https://mintscan.io/regen/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-3 inline-block align-middle"
      >
        <img src="/images/mintscan.png" alt="Mintscan" />
      </a>
    </div>
  );
};

export default AddressLink;
