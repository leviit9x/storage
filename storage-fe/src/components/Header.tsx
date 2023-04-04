import { NotificationIcon } from "@/icons/NotificationIcon";
import { SendButton } from "@/components/SendButton";
import { SendIcon } from "@/icons/SendIcon";
import {
  Row,
  Col,
  Spacer,
  Avatar,
  Text,
  useTheme,
  Input,
  Dropdown,
} from "@nextui-org/react";
import { IconButton } from "./IconButton";
import { SearchIcon } from "@/icons/SearchIcon";

function Header() {
  return (
    <Row
      css={{
        px: "30px",
        py: "26px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text size={"20px"} color="$textPrimary" css={{ fontWeight: "600" }}>
        Dashboard
      </Text>
      <Input
        size="md"
        clearable
        placeholder="Search"
        contentLeft={<SearchIcon size={18} fill="#AFB1B7" />}
        contentRightStyling={false}
        width="270px"
        css={{
          h: "44px",
          ml: "$0",
          "& .nextui-c-jeuecp": {
            marginLeft: "0px !important",
          },
        }}
      />
    </Row>
  );
}

export default Header;
