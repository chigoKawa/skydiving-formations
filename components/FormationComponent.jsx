import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";

const FormationComponent = (props) => {
  console.log("formations", props);
  const router = useRouter();
  const id = _.get(props, "id");
  const productIndex = _.get(props, "productIndex");
  const fields = _.get(props, "fields");

  const [indexIsOdd, setIndexIsOdd] = useState(false);

  useEffect(() => {
    if (!productIndex % 2 == 0) {
      setIndexIsOdd(true);
    }
    return () => {};
  }, []);

  if (!fields) {
    return "";
  }
  return (
    <div className="">
      {/* {JSON.stringify(fields)} */}
      <div className="flex flex-col space-y-10x lg:space-y-0x lg:space-x-10x lg:flex-rowx w-full p-6x lg:py-10x lg:px-40x overflow-hidden rounded-md shadow-xl">
        <div className={`  ${indexIsOdd ? "order-last" : ""}`}>
          <ImageComponent image={fields.image} />
        </div>
        <div className="  bg-gelb p-10 flex flex-col items-center">
          <div className=" h-1/3"></div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold ">{fields.title}</h2>
            <h2 className="text-xl font-bold ">
              Number of jumpers : {fields.numberOfJumpers}
            </h2>
          </div>

          <div className=" h-1/3"></div>
        </div>
      </div>
      {/* {JSON.stringify(fields)} */}
    </div>
  );
};

export default FormationComponent;
