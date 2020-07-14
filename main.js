function main() {
    const a = document.createElement('a');
    a.append('Download the MIDI file');
    //a.href = 'https://modern-bard.uk.r.appspot.com/';
    a.href = 'modern-bard.appspot.com';
    a.classList.add('midi-link');

    document.body.append(a);
    const element = document.getElementById('chord progressions');

    const play_button = document.getElementById('playpause');
    play_button.checked = 'checked';

    element.addEventListener('change', (event) => {
        const result = document.getElementById('result');
        const label = document.getElementById('scale_label');
         // = `You like ${event.target.value}`;
        if (element.value === 'Simple') {
            result.style.visibility = 'visible';
            scale_label.style.visibility = 'visible';
        } else {
            result.style.visibility = 'hidden';
            scale_label.style.visibility = 'hidden';
            result.display = 'none';
        }
    });

    // Keeping the "Level of Detail" slider setting saved in localStorage
    const detail = document.getElementById('detail');
    const det_level_label = document.getElementById('detail_level');
    
    const detail_level_setting = localStorage.getItem("detail_level_setting");

    if (detail_level_setting === null) {
        detail.value = detail_level_setting;
        detail.value = '2';
        localStorage.setItem("detail_level_setting", detail.value);
        det_level_label.textContent = 'Advanced';
    } else {
        detail.value = detail_level_setting
        if (detail.value ===  '1') {
            det_level_label.textContent = 'Simple';
        } else if (detail.value == '3') {
            det_level_label.textContent = 'Pro';
        } else {
            det_level_label.textContent = 'Advanced';
        }
        const advanced = document.getElementsByClassName("medium");
        const pro = document.getElementsByClassName("pro");

        filter_form(detail, det_level_label, pro, advanced);
    }

    // Displaying/hiding what is needed, depending on detail level
    detail.addEventListener('change', (event) => {
        localStorage.setItem("detail_level_setting", detail.value);

        const advanced = document.getElementsByClassName("medium");
        const pro = document.getElementsByClassName("pro");

        filter_form(detail, det_level_label, pro, advanced);
        
    });


    // To determine where the play button gets the midi file from
    // TODO: also link the download button accordingly
    const localstorage_url = localStorage.getItem("midi_url");

    if (localstorage_url === null) {
        var midi_url = "modern-bard.appspot.com/";
    } else if (localstorage_url.charAt(31) === "?") {
        var midi_url = "modern-bard.appspot.com/song";
    } else {
        var midi_url = localStorage.getItem("midi_url");
    }

    console.log(midi_url)

    // MIDI.js logic for the play/pause button
    const play_button_id = document.getElementById("playpause");
    play_button_id.addEventListener("change", (event) => {
        console.log(midi_url)
        if (play_button_id.value === "0") {
            MIDIjs.play(midi_url);
            play_button_id.value = "2";
        } else if (play_button_id.value === "1") {
            MIDIjs.resume()
            play_button_id.value = "2";
        } else {
            MIDIjs.pause()
            play_button_id.value = "1";
        }
    });

    const submit_song_gen = document.getElementById("submit_song_gen")
    submit_song_gen.addEventListener("click", (event) => {
        const url = window.location.search;
        const form_details = url.replace('?', '');
        const play_button_id = document.getElementById("playpause");

        var midi_url = "modern-bard.appspot.com/song_gen?" + form_details;
        localStorage.setItem("midi_url", midi_url);
    });

}

function filter_form(detail, det_level_label, pro, advanced) {
    
    let l_a = advanced.length;
    let l_p = pro.length;

    if (detail.value === '1') {
        det_level_label.textContent = 'Simple';
        for (let i = 0; i < l_a; i++) {
            advanced[i].style.display = 'none';
        }
        for (let i = 0; i < l_p; i++) {
            pro[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < l_a; i++) {
            advanced[i].style.display = 'inline';
        }
        if (detail.value === '2') {
            det_level_label.textContent = 'Advanced';
            for (let i = 0; i < l_p; i++) {
                pro[i].style.display = 'none';
            }
        } else {
            det_level_label.textContent = 'Pro';
            for (let i = 0; i < l_p; i++) {
                pro[i].style.display = 'inline';
            }
        }
    }
}


main();
