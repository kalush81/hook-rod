import React, { memo } from 'react';
import { Form, Checkbox } from 'antd';

export const ExtraServicesAvailable = memo(function ExtraServicesAvailable({
  availableServices,
  unavailableServices,
  onChangeCheckBoxes,
}) {
  return (
    <>
      {availableServices.length > 0 && (
        <>
          <h2>Opcje dodatkowe</h2>
          <div className='options'>
            <Form.Item name='options'>
              <Checkbox.Group
                style={{ display: 'block' }}
                onChange={onChangeCheckBoxes}>
                {availableServices.map((f) => {
                  return (
                    <div key={f.id} className='options_row'>
                      <Checkbox className='checkbox' value={f}></Checkbox>
                      {unavailableServices.find((id) => id === f.id) ? (
                        <h3
                          style={{ margin: 0, textDecoration: 'line-through' }}>
                          {f.name} {f.price}zł/doba
                        </h3>
                      ) : (
                        <h3 style={{ margin: 0 }}>
                          {f.name} {f.price}zł/doba
                        </h3>
                      )}
                    </div>
                  );
                })}
              </Checkbox.Group>
            </Form.Item>
          </div>
        </>
      )}
    </>
  );
});
