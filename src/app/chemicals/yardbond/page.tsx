import { SpecialtyProductPage } from "@/components/specialty/SpecialtyProductPage";
import { specialtyMetadata, yardbond } from "@/lib/specialtyProducts";

export const dynamic = "force-static";
export const metadata = specialtyMetadata(yardbond);

export default function YardBondPage() {
  return <SpecialtyProductPage product={yardbond} />;
}
