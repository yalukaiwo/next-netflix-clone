interface INavBarItemProps {
  label: string;
}

const NavBarItem: React.FC<INavBarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavBarItem;
