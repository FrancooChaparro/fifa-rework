import { Suspense } from "react";
import UserPage from "./page.client";
import { find_team_slug } from " @/utils/get_team_slug";
import Loader from " @/components/Loader/Loader";
import NotFound from " @/app/not-found";

export default async function ServerPage({ params } : { params: { slug: string }}) {

  const data =  await find_team_slug(params.slug);
  
  if (!data) {
    return NotFound();
  }

  return (
    <Suspense key={null} fallback={<Loader />}>
        <UserPage data={data}/>
    </Suspense>
  )
}