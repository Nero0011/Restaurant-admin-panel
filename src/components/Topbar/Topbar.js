
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import './Topbar.scss'

function Topbar() {
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className='logo'>Company name</span>
            </div>
            <div className='topRight'>
                <div className='topbarIconContainer'>
                    <NotificationsIcon className='icon' />
                    <AdminPanelSettingsIcon className='icon' />
                    <SettingsIcon className='icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Topbar