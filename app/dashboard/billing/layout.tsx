const SettingLayout = ({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) => {
      return (
        <div>
         
    
          <div className="md:ml-72">
           
                {children}
          </div>
        </div>
      );
    };
    
    export default SettingLayout;
    