import type { Permission } from "./api-response";
type Props = {
  permission: Permission;
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
  getIsChecked: (strLevel: string) => boolean;
  level: string;
}

export default function RecursiveRow({ permission, level, handleChange, getIsChecked }: Props) {

  const executePermissions = permission.children.filter(exPerm => exPerm.type === 'EXECUTE')
  const viewPermissions = permission.children.filter(exPerm => exPerm.type === 'VIEW')

  return <div>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <label>
          <input
            type="checkbox"
            data-level={level}
            onChange={handleChange}
            checked={getIsChecked(level)}
          />
          {permission.label}
        </label>
      </div>

      {!!executePermissions.length && <div>
        <svg height="20" width="200" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="10" x2="200" y2="10" stroke="white" strokeWidth={2} />
        </svg>
      </div>}

      <div style={{ display: 'block', width: '11rem' }}>
        {
          executePermissions.map((executePermission) => {
            const newLevel = `${level},${executePermission.idx}`

            return <div key={executePermission.name}>

              <label>
                <input
                  type="checkbox"
                  data-level={newLevel}
                  onChange={handleChange}
                  checked={getIsChecked(newLevel)}
                />
                {executePermission.label}
              </label>
            </div>
          })
        }
      </div>
    </div>
    <div style={{ padding: '1rem 0 0 1rem' }}>
      {
        viewPermissions.map((viewPermission) => {
          return <RecursiveRow
            key={viewPermission.name}
            permission={viewPermission}
            handleChange={handleChange}
            getIsChecked={getIsChecked}
            level={`${level},${viewPermission.idx}`}
          />
        })
      }
    </div>
  </div>
}