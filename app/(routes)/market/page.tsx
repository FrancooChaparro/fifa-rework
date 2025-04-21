// import { getSheetData } from " @/lib/getSheetData";
import Loader from " @/components/Loader/Loader";
import { Suspense } from "react";
import MarketComponent from "./page.client";
import { getSheetData, getUltimaColumnaFija } from " @/app/actions/getSheetData";

export default async function ServerPage() {
  // const data = await getSheetData(); // directo, sin fetch
  const lastRow = await getUltimaColumnaFija(); 

  return (
    <Suspense fallback={<Loader />}>
      <MarketComponent data={null} lastRow={lastRow} />
    </Suspense>
  );
}