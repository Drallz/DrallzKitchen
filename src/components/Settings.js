import { useState } from 'react';

export default function Settings() {
    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true,
        fontSize: 'medium'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="settings-page container">
            <h1>Settings</h1>
            
            <div className="settings-form">
                <div className="setting-group">
                    <label>Theme:</label>
                    <select name="theme" value={settings.theme} onChange={handleChange}>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                
                <div className="setting-group">
                    <label>
                        <input 
                            type="checkbox" 
                            name="notifications" 
                            checked={settings.notifications} 
                            onChange={handleChange} 
                        />
                        Enable Notifications
                    </label>
                </div>
                
                <div className="setting-group">
                    <label>Font Size:</label>
                    <div className="radio-group">
                        <label>
                            <input 
                                type="radio" 
                                name="fontSize" 
                                value="small" 
                                checked={settings.fontSize === 'small'} 
                                onChange={handleChange} 
                            />
                            Small
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="fontSize" 
                                value="medium" 
                                checked={settings.fontSize === 'medium'} 
                                onChange={handleChange} 
                            />
                            Medium
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="fontSize" 
                                value="large" 
                                checked={settings.fontSize === 'large'} 
                                onChange={handleChange} 
                            />
                            Large
                        </label>
                    </div>
                </div>
                
                <button className="save-btn">Save Settings</button>
            </div>
        </div>
    );
}