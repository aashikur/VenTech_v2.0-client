import districtsData from "@/data/bd-districts.json";
import upazilasData from "@/data/bd-upazilas.json";

/**
 * useDistrictUpazila
 * - districts: all district objects [{id, name, bn_name}]
 * - getUpazilasByDistrict: (districtName) => upazila array for that district
 */
export default function useDistrictUpazila() {
  const districts = districtsData.districts;
  const allUpazilas = upazilasData.upazilas;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // districtName দিয়ে upazila array return করবে
  const getUpazilasByDistrict = (districtName) => {
    const district = districts.find((d) => d.name === districtName);
    if (!district) return [];
    return allUpazilas.filter((u) => u.district_id === district.id);
  };

  return {bloodGroups, districts, getUpazilasByDistrict };
}