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

function Header() {
  const { isDark } = useTheme();
  return (
    <Row style={{ padding: 20 }}>
      <Col span={3}>
        <Row>
          <Avatar text="S" color="gradient" size="lg" />
          <Spacer x={1} />
          <Text
            size={30}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Storage
          </Text>
        </Row>
      </Col>
      <Col span={6}>
        <Row>
          <Col span={24}>
            <Input
              size="xl"
              bordered
              placeholder="Tìm kiếm file hoặc folder..."
              color="secondary"
              width="100%"
              clearable
              contentRightStyling={false}
              contentRight={
                <SendButton>
                  <SendIcon />
                </SendButton>
              }
            />
          </Col>
        </Row>
      </Col>
      <Col span={3}>
        <Row justify="flex-end">
          <IconButton>
            <NotificationIcon width={30} height={30} />
          </IconButton>

          <Spacer x={2} />
          <Dropdown placement="bottom-right">
            <Dropdown.Trigger>
              <Avatar
                bordered
                as="button"
                color="secondary"
                size="md"
                text="SA"
              />
            </Dropdown.Trigger>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      </Col>
    </Row>
  );
}

export default Header;
