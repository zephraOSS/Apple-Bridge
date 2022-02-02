if application "Music" is running then
    tell application "Music"
        if player state is playing or player state is paused then
            set currentTrack to current track

            return {get player state} & " -APPLEBRIDGEPLACEHOLDER- " & {get artist of currentTrack} & " -APPLEBRIDGEPLACEHOLDER- " & {get name of currentTrack} & " -APPLEBRIDGEPLACEHOLDER- " & {get album of currentTrack} & " -APPLEBRIDGEPLACEHOLDER- " & {get kind of currentTrack} & " -APPLEBRIDGEPLACEHOLDER- " & {get duration of currentTrack} & " -APPLEBRIDGEPLACEHOLDER- " & {player position} & " -APPLEBRIDGEPLACEHOLDER- " & {get genre of current track} & " -APPLEBRIDGEPLACEHOLDER- " & {get id of current track}
        else
            return "stopped"
        end if
    end tell
else
    return "stopped"
end if