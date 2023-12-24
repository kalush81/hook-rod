import React, { memo } from 'react';
import { Form, Checkbox } from 'antd';
import styled from 'styled-components';

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
                        <div style={{ display: 'flex' }}>
                          <h3
                            style={{
                              margin: 0,
                              textDecoration: 'line-through',
                            }}>
                            {f.name} {f.price}zł/doba
                          </h3>
                          <Tooltip>
                            <i className='getInfo'>info</i>
                            <div className='tooltip'>blablabla</div>
                          </Tooltip>
                        </div>
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
const Tooltip = styled.div`
  .tooltip {
    display: none;
    position: absolute;
    width: 100px;
    height: 60px;
    background-color: black;
    color: white;
    top: 0;
  }
  &:hover {
    .tooltip {
      display: block;
    }
  }
`;
