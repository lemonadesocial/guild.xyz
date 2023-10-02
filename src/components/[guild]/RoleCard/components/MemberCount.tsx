import {
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  Tooltip,
} from "@chakra-ui/react"
import useActiveStatusUpdates from "hooks/useActiveStatusUpdates"
import { Users } from "phosphor-react"

type Props = {
  memberCount: number
  roleId?: number
  size?: "sm" | "md"
  onStatusUpdateSuccess?: () => void
}

const MemberCount = ({
  memberCount,
  roleId,
  size = "md",
  onStatusUpdateSuccess,
}: Props) => {
  const { status, progress } = useActiveStatusUpdates(roleId, onStatusUpdateSuccess)

  const iconSize = size === "sm" ? "14px" : "16px"

  if (status === "STARTED")
    return (
      <Tooltip
        label={`Syncing ${progress.actionsDone}/${progress.total} members`}
        hasArrow
      >
        <Tag colorScheme="blue" mt="2px !important" flexShrink={0} size={size}>
          <TagLeftIcon as={Users} boxSize={iconSize} />
          <TagLabel mb="-1px">
            {new Intl.NumberFormat("en", { notation: "compact" }).format(
              memberCount ?? 0
            )}
          </TagLabel>
          <TagRightIcon as={Spinner} />
        </Tag>
      </Tooltip>
    )

  return (
    <Tag bg="unset" color="gray" mt="3px !important" flexShrink={0} size={size}>
      <TagLeftIcon as={Users} boxSize={iconSize} />
      <TagLabel mb="-1px">
        {new Intl.NumberFormat("en", { notation: "compact" }).format(
          memberCount ?? 0
        )}
      </TagLabel>
    </Tag>
  )
}

export default MemberCount
