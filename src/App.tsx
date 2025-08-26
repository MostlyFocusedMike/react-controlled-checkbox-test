import './App.css'
import EntityForm from './EntityForm';
import { data, type Permission } from "./api-response";

export default function App() {

  return <main>
    <h1>Checkbox Test</h1>
    <div>
      <h2 style={{ textAlign: "left" }}>{data.managementLabel}</h2>
      <hr />
      {
        data.entities.map((entity) => {
          const setIdxs = (childPerm: Permission, idx: number) => {
            childPerm.idx = idx;
            childPerm.children.forEach(setIdxs);
          }
          entity.permissions.forEach(setIdxs);
          return <EntityForm entity={entity} key={entity.name} />
        })
      }
    </div>
  </main>
}
