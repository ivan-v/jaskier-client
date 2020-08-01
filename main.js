function main() {

    const play_button = document.getElementById('playpause');

    if (!window.location.href.includes("chord_progression_generator")) {
        play_button.checked = 'checked';
    }

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
    let url = window.location.search;

    let localstorage_url = localStorage.getItem("midi_url");

    if (localstorage_url === null) {
        var midi_url = "https://modern-bard.uk.r.appspot.com/";
    // } else if (localstorage_url.charAt(31) === "?") {
        // var midi_url = "https://modern-bard.uk.r.appspot.com/song/";
    } else {
        url = window.location.search;
        const form_details = url.replace('?', '');
        if (window.location.href.includes("backing_track_generator") || 
            window.location.search.includes("bk")) {
            var midi_url = "https://modern-bard.uk.r.appspot.com/backing_track_gen?" + form_details;
        } else if (window.location.search.includes("rhythm_repetition_in_mel")) {
            var midi_url = "https://modern-bard.uk.r.appspot.com/song_gen?" + form_details;
            localStorage.setItem("midi_url", midi_url);
        } else {
            var midi_url = "https://modern-bard.uk.r.appspot.com/";
        }
    }


    url = window.location.search;
    const form_details = url.replace('?', '');
    const params = new URLSearchParams(form_details)
    params.forEach(function(val, key) {
        let key_id = document.getElementsByName(key)[0];
        key_id.value = val;
    });

    if (!window.location.href.includes("chord_progression_generator")) {

        // MIDI.js logic for the play/pause button
        var play_button_id = document.getElementById("playpause");
        console.log(midi_url)
        MIDIjs.play(midi_url);

        const my_message_div = document.getElementById("status");

        // Define a function to handle status messages
        function display_message(mes) {
            if (mes.includes("Loading")) {
                my_message_div.innerHTML = "Loading...";
            } else {
                my_message_div.innerHTML = "Ready to play";
            }
        };

        // Set the function as message callback
        MIDIjs.message_callback = display_message;


        MIDIjs.pause();
    
        play_button_id.value = "1";
        play_button_id.addEventListener("change", (event) => {
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
    }
    const gen_chord_prog = document.getElementById("gen_chord_prog")
    gen_chord_prog.addEventListener("click", (event) => {
        url = window.location.search;
        const form_details = url.replace('?', '');
        var chord_gen_url = "https://modern-bard.uk.r.appspot.com/chord_prog_gen?" + form_details;
        localStorage.setItem("chord_gen_url", chord_gen_url);
    });

    if (window.location.search.includes("cp-")) {
        url = window.location.search;
        const form_details = url.replace('?', '');
        var chord_gen_url = "https://modern-bard.uk.r.appspot.com/chord_prog_gen?" + form_details;
        localStorage.setItem("chord_gen_url", chord_gen_url);
    }

    let localstorage_chord_gen_url = localStorage.getItem('chord_gen_url');
    let localstorage_chord_prog = localStorage.getItem('chord_prog');

    if (localstorage_chord_prog !== null && localstorage_chord_gen_url === "old") {
        document.getElementById('your_chord_progression').style.visibility = 'visible';
        document.getElementById('chord_gen_result').textContent = localstorage_chord_prog;
    } else if (localstorage_chord_gen_url !== null) {
        fetch(localstorage_chord_gen_url)
        .then(res => res.json())
        .then((out) => {
            document.getElementById('your_chord_progression').style.display = 'inline';
            document.getElementById('chord_gen_result').style.display = 'inline';
            document.getElementById('chord_gen_result').textContent = out;
            localStorage.setItem('chord_prog', out);
            localStorage.setItem("chord_gen_url", "old");
        });
    }


    if (window.location.href.includes("song_generator")) {

        const submit_song_gen = document.getElementById("submit_song_gen");
        submit_song_gen.addEventListener("click", (event) => {

            url = window.location.search;
            const form_details = url.replace('?', '');
            const play_button_id = document.getElementById("playpause");

            var midi_url = "https://modern-bard.uk.r.appspot.com/song_gen?" + form_details;
            localStorage.setItem("midi_url", midi_url);
        });
    } else if (window.location.href.includes("backing_track_generator")) {

        const submit_backing_gen = document.getElementById("submit_backing_gen")
        submit_backing_gen.addEventListener("click", (event) => {
            
            url = window.location.search;
            const form_details = url.replace('?', '');
            const play_button_id = document.getElementById("playpause");

            var midi_url = "https://modern-bard.uk.r.appspot.com/backing_track_gen?" + form_details;
            localStorage.setItem("midi_url", midi_url);
        });
    } else if (!window.location.href.includes("chord_progression")) {
        const submit_backing_gen = document.getElementById("submit_backing_gen")
        submit_backing_gen.addEventListener("click", (event) => {
            
            url = window.location.search;
            const form_details = url.replace('?', '');
            const play_button_id = document.getElementById("playpause");

            var midi_url = "https://modern-bard.uk.r.appspot.com/backing_track_gen?" + form_details;
            localStorage.setItem("midi_url", midi_url);
        });
        const submit_song_gen = document.getElementById("submit_song_gen")
        submit_song_gen.addEventListener("click", (event) => {

            url = window.location.search;
            const form_details = url.replace('?', '');
            const play_button_id = document.getElementById("playpause");

            var midi_url = "https://modern-bard.uk.r.appspot.com/song_gen?" + form_details;
            localStorage.setItem("midi_url", midi_url);
        });
    }

    const bk_style = document.getElementById("bk-style");
    const bk_scale = document.getElementById("bk-scale");
    const bl_scale_label = document.getElementById("bk-scale-label");
    bk_style.addEventListener("change", (event) => {
        if (bk_style.value === "Simple") {
            bk_scale.style.display = "inline";
            bl_scale_label.style.display = "inline";
        } else {
            bk_scale.style.display = "none";
            bl_scale_label.style.display = "none";
        } 
    });


    const a = document.createElement('a');
    a.append('Download the MIDI file');
    a.href = midi_url;
    a.classList.add('midi-link');

    document.body.append(a);

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
