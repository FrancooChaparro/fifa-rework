// import { getSheetData } from " @/lib/getSheetData";
import Loader from " @/components/Loader/Loader";
import { Suspense } from "react";
import MarketComponent from "./page.client";
import { getSheetData } from " @/app/actions/getSheetData";

export default async function ServerPage() {
  const data = await getSheetData(); // directo, sin fetch
  return (
    <Suspense fallback={<Loader />}>
      <MarketComponent data={data} />
    </Suspense>
  );
}
