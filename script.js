const discordUserID = "1018366848770777149"; // Your Discord ID

async function fetchDiscordStatus() {
    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserID}`);
        const data = await response.json();
        
        if (data.success) {
            const user = data.data;
            const avatarURL = `https://cdn.discordapp.com/avatars/${discordUserID}/${user.discord_user.avatar}.png`;

            document.getElementById("discord-avatar").src = avatarURL;
            document.getElementById("favicon").href = avatarURL; // Set favicon
            document.getElementById("discord-username").textContent = `${user.discord_user.username}#${user.discord_user.discriminator}`;
            
            let statusText = "";
            switch (user.discord_status) {
                case "online": statusText = "🟢 Online"; break;
                case "idle": statusText = "🟠 Idle"; break;
                case "dnd": statusText = "🔴 DND"; break;
                case "offline": statusText = "⚫ Offline"; break;
            }
            document.getElementById("discord-status").textContent = `🔵 Status: ${statusText}`;

            let customStatus = user.activities.find(a => a.type === 4);
            document.getElementById("discord-custom-status").textContent = customStatus ? `💬 ${customStatus.state}` : "💬 No custom status set.";

            let activity = user.activities.find(a => a.type === 0); 
            document.getElementById("discord-activity").textContent = activity ? `🎮 Playing: ${activity.name}` : "🎮 No activity.";
        }
    } catch (error) {
        console.error("Failed to fetch Discord status.");
    }
}

fetchDiscordStatus();
