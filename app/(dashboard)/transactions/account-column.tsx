import {useOpenAccount} from "@/features/accounts/hooks/use-open-account";
type Props = {
  id: string;
  account: string | null;
  accountId: string | null;
};
function AccountColumn({id, account, accountId}: Props) {
  const {onOpen: onOpenAccount} = useOpenAccount();
  const onClick = () => {
    onOpenAccount(accountId!);
  };
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
}

export default AccountColumn;
