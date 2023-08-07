if application "Music" is running then
    tell application "Music"
        if player state is playing or player state is paused then
            set PLACEHOLDER to " -APPLEBRIDGEPLACEHOLDER- "
            set currentTrack to current track

            set currentAirPlayDevices to current AirPlay devices
            set AirPlayEnabled to false
            set AirPlayDevice to {}

            repeat with device in currentAirPlayDevices
                if selected of device is true then
                    set AirPlayEnabled to true
                    set AirPlayDevice to {name: name of device, kind: kind of device, selected: selected of device}

                    exit repeat
                end if
            end repeat

            return {get player state} & PLACEHOLDER & artist of currentTrack & PLACEHOLDER & name of currentTrack & PLACEHOLDER & album of currentTrack & PLACEHOLDER & media kind of currentTrack & PLACEHOLDER & duration of currentTrack & PLACEHOLDER & player position & PLACEHOLDER & genre of currentTrack & PLACEHOLDER & year of currentTrack & PLACEHOLDER & id of currentTrack & PLACEHOLDER & AirPlayEnabled & PLACEHOLDER & name of AirPlayDevice & PLACEHOLDER & kind of AirPlayDevice & PLACEHOLDER & selected of AirPlayDevice
        else
            return "stopped"
        end if
    end tell
else
    return "stopped"
end if