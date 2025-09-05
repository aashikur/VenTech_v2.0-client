import InputField from "./shared/InputField";
import { BiStore, BiMap, BiCreditCard } from "react-icons/bi";

const StepShopInfo = ({ form, onChange }) => (
  <div className="space-y-5">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">🏪 Shop Information</h3>
    <InputField icon={<BiStore />} label="Shop Name *" name="shopName" value={form.shopName} onChange={onChange} placeholder="Enter your shop name" />
    <InputField icon={<BiCreditCard />} label="Shop Number *" name="shopNumber" value={form.shopNumber} onChange={onChange} placeholder="Unique shop identifier" />
    <InputField icon={<BiMap />} label="Shop Address *" name="shopAddress" value={form.shopAddress} onChange={onChange} placeholder="Enter your shop address" />
    <InputField icon={<BiCreditCard />} label="Trade License" name="tradeLicense" value={form.tradeLicense} onChange={onChange} placeholder="Trade license number (optional)" />
  </div>
);

export default StepShopInfo;
