import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import React from "react";
import Button from "../../components/Button";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Subscriber from "../../model/subscriber";
import mongoConnect from "./../../lib/mongoConnect";
import Router from "next/router";
import useLoading from "../../Hooks/useLoading";
import Overlay from "../../components/Overlay";
import Loader from "../../components/Loader";

interface IProps {
  id: string;
}

const Unsubscribe: NextPage<IProps> = ({ id }) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const { loading, initiateLoading, cancelLoading } = useLoading();
  let timeoutError: any;
  let timeoutSuccess: any;

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
  };

  const unsubHandler = async () => {
    try {
      initiateLoading();
      await axios.put("/api/subscribe", { id });
      cancelLoading();
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
      cancelLoading();
    }
  };

  React.useEffect(() => {
    if (success) {
      timeoutSuccess = setTimeout(() => {
        Router.push("/");
      }, 3000);
    }

    return () => clearTimeout(timeoutSuccess);
  }, [success]);

  React.useEffect(() => {
    if (error) {
      timeoutError = setTimeout(() => {
        setError(false);
      }, 2000);
    }

    return () => clearTimeout(timeoutError);
  }, [error]);

  return (
    <>
      <Navbar />

      {loading && (
        <Overlay>
          <Loader />
        </Overlay>
      )}

      <div className="w-full flex justify-center pt-12">
        <div className="max-w-[350px] flex flex-col items-center bg-white rounded-lg shadow-lg p-8 pb-4">
          <div className="flex flex-row items-start">
            <input
              type={"checkbox"}
              checked={isChecked}
              onChange={toggleChecked}
              id="unsub-input"
              className="mb-4 mt-2 mr-2"
              disabled={success}
            />
            <label htmlFor={"unsub-input"} className="mb-4">
              I am sure that I want to cancel my newsletter subscription for
              Shoeb Ilyas articles.
            </label>
          </div>
          <Button
            className={`${!isChecked ? "text-gray-500 bg-gray-300" : ""}`}
            disabled={!isChecked || success}
            onClick={unsubHandler}
          >
            Cancel Subscription
          </Button>

          {error && (
            <p className="mt-4 font-medium text-red-500 text-md">
              Something went wrong!
            </p>
          )}

          {success && (
            <p className="mt-4 font-medium text-green-800 text-md">
              <strong className=" capitalize mr-2">Success</strong>
              Please check your email.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const text = context.params?.id || "";
  const id = `${text}`.substring(text.lastIndexOf("-") + 1);

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await mongoConnect();
  const ids = await Subscriber.find();
  console.log(ids);

  const paths = ids.map(
    (item: { email: string; name: string; _id: string }) => ({
      params: {
        id: `${item.name.replaceAll(" ", "-").toLowerCase()}-${item._id}`,
      },
    })
  );

  return {
    paths,
    fallback: "blocking",
  };
};
