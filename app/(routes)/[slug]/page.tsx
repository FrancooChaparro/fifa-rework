import { Suspense } from "react";
import { find_user_slug } from " @/utils/get_team_slug";
import UserPage from "./page.client";
import Loader from " @/components/Loader/Loader";

export default async function ServerPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await find_user_slug(params.slug);

  if (!data) {
    return <div>Equipo no encontrado</div>;
  }
  const golesFavorFinals = data.golesFavorFinals;
  const sumarGolesVisitanteFinals = data.sumarGolesVisitanteFinals;
  const golesFavorClasics = data.golesFavorClasics;
  const sumarGolesVisitanteClasics = data.sumarGolesVisitanteClasics;

  return (
    <Suspense key={null} fallback={<Loader />}>
      <UserPage
        playerStats={data.playerStats}
        {...{
          golesFavorFinals,
          sumarGolesVisitanteFinals,
          golesFavorClasics,
          sumarGolesVisitanteClasics,
        }}
      />
    </Suspense>
  );
}
