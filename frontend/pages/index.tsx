import AutoAssignPage from "../components/AutoAssign/AutoAssignPage";
import { Hospital, Driver } from "../components/AutoAssign/types";
import { fetchHospitals, fetchDrivers } from "../services/api";

export default function Home(props: { hospitalsSeed: Hospital[]; drivers: Driver[] }) {
  return <AutoAssignPage hospitalsSeed={props.hospitalsSeed} drivers={props.drivers} />;
}

export async function getServerSideProps() {
  const [hospitalsSeed, drivers] = await Promise.all([fetchHospitals(), fetchDrivers()]);
  return { props: { hospitalsSeed, drivers } };
}
