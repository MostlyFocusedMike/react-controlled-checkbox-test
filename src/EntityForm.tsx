import { useRef, useState } from "react";
import { type Entity, type Permission } from "./api-response";
import RecursiveRow from "./RecursiveRow";

export default function EntityForm({ entity }: { entity: Entity }) {
  const [formState, setFormState] = useState(entity.permissions);
  const viewRef = useRef(null);
  const executeRef = useRef(null);

  const getIsChecked = (strLevel: string) => {
    const level = strLevel.split(',');

    let spot = formState[Number(level[0])] as Permission;
    if (level.length > 1) {
      level.slice(1).forEach(levelNum => {
        spot = spot.children[Number(levelNum)] as unknown as Permission;
      })
    }

    return spot.isChecked;
  }

  // useEffect(() => {
  //   if (viewRef.current) (viewRef.current as HTMLInputElement).indeterminate = true;
  //   if (executeRef.current) (executeRef.current as HTMLInputElement).indeterminate = true;
  // }, []);

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const level = (input.dataset as { level: string }).level.split(',');
    const newForm = JSON.parse(JSON.stringify(formState));

    let spot = newForm[level[0]] as Permission;
    const parents = []
    parents.push(spot);

    if (level.length > 1) {
      level.slice(1).forEach(levelNum => {
        spot = spot.children[Number(levelNum)] as unknown as Permission;
        parents.push(spot);
      })
    }

    // Deselect all children
    if (spot.type === 'VIEW' && !input.checked) {
      const deselectChildren = (childSpot: Permission) => {
        childSpot.isChecked = false;
        childSpot.children.forEach(deselectChildren)
      }
      spot.children.forEach(deselectChildren);
    }

    if (!input.checked) {
      spot.isChecked = false;
      return setFormState(newForm);
    }

    parents.forEach((parent) => {
      parent.isChecked = input.checked;
    });
    setFormState(newForm);
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formState:', formState);
  }

  const style = {
    display: 'flex',
    alignItems: 'center', gap: '2rem', justifyContent: 'space-around'
  }

  return <form onSubmit={handleSubmit}>
    <div className="form-heading" style={style}>
      <h3 style={{ marginRight: 'auto' }}>{entity.label}</h3>
      <div style={{ display: 'flex' }}>
        <label style={{ width: '26.5rem' }}>
          <input type="checkbox" ref={viewRef} />
          View
        </label>
        <label style={{ width: '10rem' }}>
          <input type="checkbox" ref={executeRef} />
          Execute
        </label>
      </div>
    </div>
    <div style={{ paddingLeft: '25rem' }}>
      {
        formState.map((permission) => {
          // maybe this can just come from the API
          return <div key={permission.name} className="primary-row" >
            <RecursiveRow
              permission={permission}
              handleChange={handleChange}
              level={`${permission.idx}`}
              getIsChecked={getIsChecked}
            />
            <hr />
          </div>
        })
      }
    </div>
    <button>Submit</button>
  </form>
}