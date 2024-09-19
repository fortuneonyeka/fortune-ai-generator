const SettingLayout = ({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) => {
      return (
        <div>
         
    
          <div className="ml-8">
           
                {children}
          </div>
        </div>
      );
    };
    
    export default SettingLayout;
    