import MyLayout from "@/components/MyLayout";
import { FeedFolder } from "@/components/FeedFolder";
import { FolderList } from "@/components/FolderList";
import { RecentUploadList } from "@/components/RecentUploadList";

export default function Home() {
  return (
    <MyLayout>
      <FeedFolder />
      <FolderList />
      <RecentUploadList />
    </MyLayout>
  );
}
