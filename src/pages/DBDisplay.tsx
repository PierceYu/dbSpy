// React & React Router & React Query Modules;
import React, {useRef} from 'react';

// Components Imported;
import Sidebar from '../components/DBDisplay/Sidebar';
import FeatureTab from '../components/DBDisplay/FeatureTab';
import Flow from '../components/ReactFlow/Flow';
import useSchemaStore from '../store/schemaStore';
import useFlowStore from '../store/flowStore';
import useSettingsStore from '../store/settingsStore';


const DBDisplay = () => {
  const {schemaStore, reference, setReference} = useSchemaStore(state=>state);
  const {edges, nodes} = useFlowStore(state=>state);
  const {sidebarDisplayState, welcome} = useSettingsStore(state=>state);
  //END: STATE DECLARATION

  
  
  //create references for HTML elements
  const mySideBarId:any = useRef();
  const mainId:any = useRef();

  /* Set the width of the side navigation to 250px and add a black background color to body */
  const openNav = () => {
    mySideBarId.current.style.width = "400px";
    mainId.current.style.marginRight = "400px";
  }


/* Set the width of the side navigation to 0, and the background color of body to white */
  const closeNav = () => {
    mySideBarId.current.style.width = "0";
    mainId.current.style.marginRight = "50px"
  }
  
/* Sidebar handler*/
  function handleSidebar(){
    if (sidebarDisplayState) closeNav()
    else openNav();
  }

  return (
    <div id='DBDisplay' className='bg-[#f8f4eb] dark:bg-slate-700 transition-colors duration-500'>
      <div ref={mySideBarId} id="mySidenav" className="sidenav bg-[#fbf3de] dark:bg-slate-700 shadow-2xl">
        <a href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <Sidebar closeNav={closeNav} />
      </div>

      {/* <!-- Use any element to open the sidenav --> */}
      <FeatureTab handleSidebar={handleSidebar} />

      {/* <!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page --> */}
      <div ref={mainId} id="main" className='transition-colors duration-500 mx-auto'>
        {welcome ? 
          <div className="canvas-ConnectToDatabase dark:text-[#f8f4eb] transition-colors duration-500 w-[50%] m-auto flex flex-col">
            <h3 className='text-center'>
              Welcome to dbSpy!
            </h3>
            <p className='text-center'>
              Please connect your database, upload a SQL file, or build your
              database from scratch!
            </p>
          </div>     
          :
          <Flow />
        }
      </div>
      {/* MODAL FOR ADD NEW REFERENCES */}
      <div id="addReferenceModal" className="addReferenceModal">
        {/* <!-- Add Table Modal content --> */}
        <div className="modal-content content-center bg-[#f8f4eb] dark:bg-slate-800 rounded-md border-0 w-[30%] min-w-[300px] max-w-[550px] shadow-[0px_5px_10px_rgba(0,0,0,0.4)] dark:shadow-[0px_5px_10px_#1e293b]">
          <p className="text-center mb-4 text-slate-900 dark:text-[#f8f4eb]">Foreign Key References</p>
          <div className='flex justify-between w-[50%] max-w-[200px] mx-auto'>
            <label>PrimaryKeyName: </label><input id='PrimaryKeyNameInput' />
            <label>ReferencesPropertyName: </label><input id='ReferencesPropertyNameInput' />
            <label>PrimaryKeyTableName: </label><input id='PrimaryKeyTableNameInput' />
            <label>ReferencesTableName: </label><input id='ReferencesTableNameInput' />
            <label>IsDestination: </label><input id='IsDestinationInput' />
            <label>constraintName: </label><input id='constrainNameInput' />
            <button 
              onClick={()=> {
                //hide Add reference modal and pass true to next function
                // closeAddReferenceModal(true)
                document.querySelector('#addReferenceModal').style.display = "none";
                // addReference();
                setReference ([{
                  PrimaryKeyName: document.querySelector('#PrimaryKeyNameInput').value,
                  ReferencesPropertyName: document.querySelector('#ReferencesPropertyNameInput').value,
                  PrimaryKeyTableName: document.querySelector('#PrimaryKeyTableNameInput').value,
                  ReferencesTableName: document.querySelector('#ReferencesTableNameInput').value,
                  IsDestination: document.querySelector('#IsDestinationInput').value, 
                  constrainName: document.querySelector('#constrainNameInput').value,
                }]);
              }}
              className="text-slate-900 dark:text-[#f8f4eb] modalButton">SAVE</button>
            <button 
              onClick={()=>{
                document.querySelector('#addReferenceModal').style.display = "none";
              }} 
              className="text-slate-900 dark:text-[#f8f4eb] modalButton">CANCEL</button>
          </div> 
        </div>
      </div>
      {/* END: MODAL FOR ADD NEW REFERENCES */}
    </div> 
  )
};

export default DBDisplay;