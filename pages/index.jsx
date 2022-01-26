// import Head from "next/head";
// import Image from "next/image";
import _ from "lodash";
import FormationComponent from "../components/FormationComponent";
import { getEntriesByContentType } from "../lib/helpers";

// styles

export default function Home(props) {
  const formations = _.get(props, "formations");

  return (
    <>
      <h1 className="font-bold text-lg px-60x">{""}</h1>
      <div className="flex flex-col space-y-4">
        {Array.isArray(formations)
          ? formations.map((formation, formationIndex) => {
              const contentType = _.get(formation, "sys.contentType.sys.id");
              const sectionId = _.get(formation, "sys.id");
              const fields = _.get(formation, "fields");
              if (contentType === "formation") {
                return (
                  <FormationComponent
                    key={sectionId}
                    id={sectionId}
                    fields={fields}
                  />
                );
              }

              if (contentType === "product") {
                return <>{contentType}</>;
              }

              return "";
            })
          : ""}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const formationEntries = await getEntriesByContentType("formation");
  let formations = _.get(formationEntries, "items");

  return {
    props: {
      formations: formations,
    },
  };
}
