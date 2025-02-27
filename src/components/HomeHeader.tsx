import Link from "next/link";

const HomeHeader = () => {
  return (
    <header className="px-4 py-3 md:px-6 md:py-4 text-md flex justify-end space-x-4 md:space-x-6">
      <div>
        <Link href="/stats">Stats</Link>
      </div>
      <div>
        <Link href="/about">About</Link>
      </div>
    </header>
  );
};

export default HomeHeader;
