let SEED = "666";
Nof1.SET_SEED(SEED);

let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Datentypen-Verständnis",
        seed: SEED,

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Willkommen zum Experiment.\n\nBitte arbeite konzentriert und im Vollbildmodus ([F11])."
            ),
            writer.convert_string_to_html_string(
                "Du wirst gleich 10 Codebeispiele sehen.\n\nGib als Antwort eine Zahl ein und bestätige mit [Enter]."
            )
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string("Training abgeschlossen. Jetzt beginnt das Experiment.")
        ),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string("Bereit? Es folgen 10 Aufgaben.")
        ),

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string("Experiment beendet. Vielen Dank für deine Teilnahme!")
            )
        ],

        layout: [
            { variable: "CodeType", treatments: ["sprechende", "abstrakt"] }
        ],

        training_configuration: {
            fixed_treatments: [["CodeType", "sprechende"]],
            can_be_cancelled: false,
            can_be_repeated: false
        },

        repetitions: 10,

        measurement: Nof1.Reaction_time(Nof1.keys(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])),

        task_configuration: (t) => {
            const examples = [
                {
                    code: `let x = 0;\nfor (let i = 0; i < 3; i++) {\n  x++;\n}\nconsole.log(x);`,
                    answer: "3"
                },
                {
                    code: `let sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  sum += i;\n}\nconsole.log(sum);`,
                    answer: "6"
                },
                {
                    code: `let v = 5;\nif (v > 3) {\n  v -= 2;\n}\nconsole.log(v);`,
                    answer: "3"
                },
                {
                    code: `let n = 4;\nif (n % 2 == 0) {\n  n /= 2;\n}\nconsole.log(n);`,
                    answer: "2"
                },
                {
                    code: `let c = 0;\nfor (let i = 0; i < 5; i++) {\n  if (i % 2 === 0) c++;\n}\nconsole.log(c);`,
                    answer: "3"
                },
                {
                    code: `let y = 1;\nfor (let i = 0; i < 2; i++) {\n  y += 2;\n}\nconsole.log(y);`,
                    answer: "5"
                },
                {
                    code: `let a = 7;\nif (a < 10) {\n  a -= 4;\n}\nconsole.log(a);`,
                    answer: "3"
                },
                {
                    code: `let p = 0;\nfor (let j = 0; j < 4; j++) {\n  p += 1;\n}\nconsole.log(p);`,
                    answer: "4"
                },
                {
                    code: `let b = 6;\nif (b % 3 == 0) {\n  b = b / 2;\n}\nconsole.log(b);`,
                    answer: "3"
                },
                {
                    code: `let v = 3;\nif (v > 2) {\n  v += 2;\n}\nconsole.log(v);`,
                    answer: "5"
                }
            ];

            if (typeof window.exampleCounter === "undefined") {
                window.exampleCounter = 0;
            }

            const current = examples[window.exampleCounter % examples.length];
            window.exampleCounter++;

            t.expected_answer = current.answer;

            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage(
                    `<div class='sourcecode'><pre>${current.code}</pre></div>`
                );
            };

            t.accepts_answer_function = (given_answer) => {
                t.last_answer = given_answer.trim();
                return true;
            };

            t.do_print_error_message = (given_answer) => {
                writer.clear_stage();
                writer.clear_error();
                writer.print_html_on_error("<h1>Ungültige Eingabe: " + given_answer + "</h1>");
            };

            t.do_print_after_task_information = () => {
                writer.clear_error();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Drücke [Enter], um weiterzumachen."
                ));
            };
        }
    };
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
