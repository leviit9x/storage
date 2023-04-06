import MyLayout from "@/components/MyLayout";
import { FeedFolder } from "@/components/FeedFolder";
import { FolderList } from "@/components/FolderList";
import { RecentUploadList } from "@/components/RecentUploadList";

export default function Home() {
  console.log("process.env", process.env.NEXT_PUBLIC_ENV_VARIABLE);
  return (
    <MyLayout>
      <FeedFolder />
      <FolderList />
      <RecentUploadList />
    </MyLayout>
  );
}

// `getStaticProps`, and similar Next.js methods like `getStaticPaths` and `getServerSideProps`
// only run in Node.js. Check the terminal to see the environment variables
export async function getStaticProps() {
  // Using the variables below in the browser will return `undefined`. Next.js doesn't
  // expose environment variables unless they start with `NEXT_PUBLIC_`
  console.log("[Node.js only] ENV_VARIABLE:", process.env.ENV_VARIABLE);
  console.log(
    "[Node.js only] ENV_LOCAL_VARIABLE:",
    process.env.ENV_LOCAL_VARIABLE
  );

  return { props: {} };
}
