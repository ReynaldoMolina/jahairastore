const phrases = [
  {phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier", date: "2025-01-01"},
  {phrase: "No cuentes los días, haz que los días cuenten.", author: "Muhammad Ali", date: "2025-01-02"},
  {phrase: "Cree en ti mismo y todo será posible.", author: "Desconocido", date: "2025-01-03"},
  {phrase: "La única forma de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs", date: "2025-01-04"},
  {phrase: "Cada día es una nueva oportunidad para cambiar tu vida.", author: "Desconocido", date: "2025-01-05"},
  {phrase: "No te rindas. El comienzo es siempre lo más difícil.", author: "Desconocido", date: "2025-01-06"},
  {phrase: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt", date: "2025-01-07"},
  {phrase: "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.", author: "Jerry Rice", date: "2025-01-08"},
  {phrase: "Cualquier cosa que la mente del hombre pueda concebir y creer, puede lograrla.", author: "Napoleon Hill", date: "2025-01-09"},
  {phrase: "La motivación te pone en marcha, el hábito te mantiene en movimiento.", author: "Jim Ryun", date: "2025-01-10"},
  {phrase: "El fracaso es la oportunidad de comenzar de nuevo, pero con más inteligencia.", author: "Henry Ford", date: "2025-01-11"},
  {phrase: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs", date: "2025-01-12"},
  {phrase: "Si puedes soñarlo, puedes hacerlo.", author: "Walt Disney", date: "2025-01-13"},
  {phrase: "Nunca es demasiado tarde para ser lo que podrías haber sido.", author: "George Eliot", date: "2025-01-14"},
  {phrase: "Persigue tus sueños, ellos saben el camino.", author: "Desconocido", date: "2025-01-15"},
  {phrase: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el valor para continuar.", author: "Winston Churchill", date: "2025-01-16"},
  {phrase: "El secreto del cambio es enfocar toda tu energía no en luchar contra lo viejo, sino en construir lo nuevo.", author: "Sócrates", date: "2025-01-17"},
  {phrase: "No esperes oportunidades, créalas.", author: "Desconocido", date: "2025-01-18"},
  {phrase: "La única forma de hacer algo increíble es creyendo que es posible.", author: "Desconocido", date: "2025-01-19"},
  {phrase: "Lo que consigues al alcanzar tus metas no es tan importante como en quién te conviertes al lograrlas.", author: "Zig Ziglar", date: "2025-01-20"},
  {phrase: "La mejor manera de predecir el futuro es creándolo.", author: "Peter Drucker", date: "2025-01-21"},
  {phrase: "Cree que puedes y ya estás a medio camino.", author: "Theodore Roosevelt", date: "2025-01-22"},
  {phrase: "Las dificultades preparan a personas comunes para destinos extraordinarios.", author: "C.S. Lewis", date: "2025-01-23"},
  {phrase: "Lo único imposible es aquello que no intentas.", author: "Desconocido", date: "2025-01-24"},
  {phrase: "No permitas que lo que no puedes hacer interfiera con lo que sí puedes hacer.", author: "John Wooden", date: "2025-01-25"},
  {phrase: "Si te cansas, aprende a descansar, no a renunciar.", author: "Banksy", date: "2025-01-26"},
  {phrase: "Cada gran logro fue considerado imposible alguna vez.", author: "Desconocido", date: "2025-01-27"},
  {phrase: "Haz algo hoy que tu futuro yo te agradezca.", author: "Desconocido", date: "2025-01-28"},
  {phrase: "La vida es 10% lo que te sucede y 90% cómo reaccionas a ello.", author: "Charles R. Swindoll", date: "2025-01-29"},
  {phrase: "Si no te desafía, no te cambia.", author: "Desconocido", date: "2025-01-30"},
  {phrase: "El éxito no se trata de ganar siempre, sino de nunca darse por vencido.", author: "Desconocido", date: "2025-01-31"},
  {phrase: "Sé el cambio que quieres ver en el mundo.", author: "Mahatma Gandhi", date: "2025-02-01"},
  {phrase: "Confía en el proceso, todo esfuerzo tiene su recompensa.", author: "Desconocido", date: "2025-02-02"},
  {phrase: "No te compares con los demás, compárate con la persona que eras ayer.", author: "Desconocido", date: "2025-02-03"},
  {phrase: "Las cosas buenas llegan a quienes trabajan por ellas.", author: "Desconocido", date: "2025-02-04"},
  {phrase: "Esfuérzate más de lo que crees posible, los resultados te sorprenderán.", author: "Desconocido", date: "2025-02-05"},
  {
    phrase: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
    author: "Eleanor Roosevelt",
    date: "2025-02-06"
  },
  {
    phrase: "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.",
    author: "Jerry Rice",
    date: "2025-02-07"
  },
  {
    phrase: "Nunca es demasiado tarde para ser lo que podrías haber sido.",
    author: "George Eliot",
    date: "2025-02-08"
  },
  {
    phrase: "La vida es un 10% lo que nos sucede y un 90% cómo reaccionamos ante ello.",
    author: "Charles R. Swindoll",
    date: "2025-02-09"
  },
  {
    phrase: "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer.",
    author: "John Wooden",
    date: "2025-02-10"
  },
  {
    phrase: "La única forma de hacer un buen trabajo es amar lo que haces.",
    author: "Steve Jobs",
    date: "2025-02-11"
  },
  {
    phrase: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    author: "Vidal Sassoon",
    date: "2025-02-12"
  },
  {
    phrase: "El dolor es temporal, la gloria es para siempre.",
    author: "Desconocido",
    date: "2025-02-13"
  },
  {
    phrase: "La mayor gloria no está en no caer nunca, sino en levantarnos cada vez que caemos.",
    author: "Confucio",
    date: "2025-02-14"
  },
  {
    phrase: "Si no luchas por lo que quieres, no te lamentes por lo que pierdes.",
    author: "Desconocido",
    date: "2025-02-15"
  },
  {
    phrase: "No se trata de ser el mejor, se trata de ser mejor que ayer.",
    author: "Desconocido",
    date: "2025-02-16"
  },
  {
    phrase: "La motivación es lo que te hace empezar, el hábito es lo que te hace continuar.",
    author: "Jim Ryun",
    date: "2025-02-17"
  },
  {
    phrase: "El único límite a nuestros logros de mañana son nuestras dudas y vacilaciones de hoy.",
    author: "Franklin D. Roosevelt",
    date: "2025-02-18"
  },
  {
    phrase: "No te rindas, cada fracaso es una oportunidad para empezar de nuevo con más inteligencia.",
    author: "Henry Ford",
    date: "2025-02-19"
  },
  {
    phrase: "El único modo de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
    date: "2025-02-20"
  },
  {
    phrase: "Todo lo que puedes imaginar es real.",
    author: "Pablo Picasso",
    date: "2025-02-21"
  },
  {
    phrase: "Hazlo o no lo hagas, pero no lo intentes.",
    author: "Yoda",
    date: "2025-02-22"
  },
  {
    phrase: "La disciplina es el puente entre las metas y los logros.",
    author: "Jim Rohn",
    date: "2025-02-23"
  },
  {
    phrase: "Los sueños no tienen fecha de caducidad.",
    author: "Lupita Nyong'o",
    date: "2025-02-24"
  },
  {
    phrase: "Lo único imposible es aquello que no intentas.",
    author: "Jeanette Coron",
    date: "2025-02-25"
  },
  {
    phrase: "La vida es 10% lo que me sucede y 90% cómo reacciono ante ello.",
    author: "Charles R. Swindoll",
    date: "2025-02-26"
  },
  {
    phrase: "No tienes que ser grande para comenzar, pero tienes que comenzar para ser grande.",
    author: "Zig Ziglar",
    date: "2025-02-27"
  },
  {
    phrase: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar.",
    author: "Winston Churchill",
    date: "2025-02-28"
  },
  {
    phrase: "La acción es la clave fundamental para el éxito.",
    author: "Pablo Picasso",
    date: "2025-03-01"
  },
  {
    phrase: "La forma en que nos enfrentamos a los desafíos es lo que realmente define nuestro carácter.",
    author: "Desconocido",
    date: "2025-03-02"
  },
  {
    phrase: "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.",
    author: "Proverbio chino",
    date: "2025-03-03"
  },
  {
    phrase: "El mayor riesgo es no tomar ningún riesgo.",
    author: "Mark Zuckerberg",
    date: "2025-03-04"
  },
  {
    phrase: "Si puedes soñarlo, puedes lograrlo.",
    author: "Walt Disney",
    date: "2025-03-05"
  },
  {
    phrase: "La forma más efectiva de hacerlo es hacerlo.",
    author: "Amelia Earhart",
    date: "2025-03-06"
  },
  {
    phrase: "No importa lo lento que vayas mientras no te detengas.",
    author: "Confucio",
    date: "2025-03-07"
  },
  {
    phrase: "La diferencia entre lo que somos y lo que queremos ser es lo que hacemos.",
    author: "Desconocido",
    date: "2025-03-08"
  },
  {
    phrase: "No sueñes tu vida, vive tus sueños.",
    author: "Desconocido",
    date: "2025-03-09"
  },
  {
    phrase: "Cualquiera que deje de aprender es viejo, ya sea a los veinte o a los ochenta.",
    author: "Henry Ford",
    date: "2025-03-10"
  },
  {
    phrase: "Cada día es una nueva oportunidad para cambiar tu vida.",
    author: "Desconocido",
    date: "2025-03-11"
  },
  {
    phrase: "Lo único imposible es aquello que no intentas.",
    author: "Jeanette Coron",
    date: "2025-03-12"
  },
  {
    phrase: "La felicidad no es algo hecho. Viene de tus propias acciones.",
    author: "Dalai Lama",
    date: "2025-03-13"
  },
  {
    phrase: "El éxito no se mide por lo que logras, sino por los obstáculos que superas.",
    author: "Booker T. Washington",
    date: "2025-03-14"
  },
  {
    phrase: "Cualquier cosa que la mente pueda concebir y creer, puede lograrse.",
    author: "Napoleon Hill",
    date: "2025-03-15"
  },
  {
    phrase: "La vida es lo que pasa cuando estás ocupado haciendo otros planes.",
    author: "John Lennon",
    date: "2025-03-16"
  },
  {
    phrase: "Los grandes logros requieren tiempo, esfuerzo y perseverancia.",
    author: "Desconocido",
    date: "2025-03-17"
  },
  {
    phrase: "Nunca dejes que lo que no puedes hacer interfiera con lo que puedes hacer.",
    author: "John Wooden",
    date: "2025-03-18"
  },
  {
    phrase: "Lo que hagas hoy puede mejorar todos tus mañanas.",
    author: "Ralph Marston",
    date: "2025-03-19"
  },
  {
    phrase: "Lo único que está entre tú y tu objetivo es la historia que te sigues contando sobre por qué no puedes lograrlo.",
    author: "Jordan Belfort",
    date: "2025-03-20"
  },
  {
    phrase: "La única forma de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
    date: "2025-03-21"
  },
  {
    phrase: "El mejor momento para empezar es ahora.",
    author: "Desconocido",
    date: "2025-03-22"
  },
  {
    phrase: "Nunca es demasiado tarde para ser lo que podrías haber sido.",
    author: "George Eliot",
    date: "2025-03-23"
  },
  {
    phrase: "Lo que hagas hoy te acercará a lo que deseas mañana.",
    author: "Desconocido",
    date: "2025-03-24"
  },
  {
    phrase: "El éxito consiste en ir de fracaso en fracaso sin perder el entusiasmo.",
    author: "Winston Churchill",
    date: "2025-03-25"
  },
  {
    phrase: "Tienes dentro de ti todo lo que necesitas para superar cualquier desafío.",
    author: "Desconocido",
    date: "2025-03-26"
  },
  {
    phrase: "Cada nuevo día es una nueva oportunidad para cambiar tu vida.",
    author: "Desconocido",
    date: "2025-03-27"
  },
  {
    phrase: "No se trata de lo que logras, sino de quién te conviertes en el proceso.",
    author: "Desconocido",
    date: "2025-03-28"
  },
  {
    phrase: "La vida comienza donde termina tu zona de confort.",
    author: "Neale Donald Walsch",
    date: "2025-03-29"
  },
  {
    phrase: "Nunca dejes que el miedo decida tu futuro.",
    author: "Desconocido",
    date: "2025-03-30"
  },
  {
    phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
    date: "2025-03-31"
  },
  {
    phrase: "Haz lo que puedas, con lo que tienes, donde estés.",
    author: "Theodore Roosevelt",
    date: "2025-04-01"
  },
  {
    phrase: "No se trata de cuántas veces caes, sino de cuántas veces te levantas.",
    author: "Vince Lombardi",
    date: "2025-04-02"
  },
  {
    phrase: "El mayor error que puedes cometer en la vida es temer constantemente que cometerás uno.",
    author: "Elbert Hubbard",
    date: "2025-04-03"
  },
  {
    phrase: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    author: "Vidal Sassoon",
    date: "2025-04-04"
  },
  {
    phrase: "Tú eres el único responsable de tu felicidad.",
    author: "Desconocido",
    date: "2025-04-05"
  },
  {
    phrase: "Las grandes cosas nunca vienen de la zona de confort.",
    author: "Desconocido",
    date: "2025-04-06"
  },
  {
    phrase: "La vida es lo que sucede cuando estás ocupado haciendo otros planes.",
    author: "John Lennon",
    date: "2025-04-07"
  },
  {
    phrase: "Haz lo que puedas, con lo que tengas, donde estés.",
    author: "Theodore Roosevelt",
    date: "2025-04-08"
  },
  {
    phrase: "Si puedes soñarlo, puedes lograrlo.",
    author: "Walt Disney",
    date: "2025-04-09"
  },
  {
    phrase: "No cuentes los días, haz que los días cuenten.",
    author: "Muhammad Ali",
    date: "2025-04-10"
  },
  {
    phrase: "El único modo de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
    date: "2025-04-11"
  },
  {
    phrase: "La vida no es esperar a que pase la tormenta, es aprender a bailar bajo la lluvia.",
    author: "Vivian Greene",
    date: "2025-04-12"
  },
  {
    phrase: "No se trata de ser el mejor, se trata de ser mejor que ayer.",
    author: "Desconocido",
    date: "2025-04-13"
  },
  {
    phrase: "Nunca es demasiado tarde para ser lo que podrías haber sido.",
    author: "George Eliot",
    date: "2025-04-14"
  },
  {
    phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
    date: "2025-04-15"
  },
  {
    phrase: "Lo único imposible es aquello que no intentas.",
    author: "Jeanette Coron",
    date: "2025-04-16"
  },
  {
    phrase: "El secreto para salir adelante es comenzar.",
    author: "Mark Twain",
    date: "2025-04-17"
  },
  {
    phrase: "El éxito es la habilidad de ir de fracaso en fracaso sin perder el entusiasmo.",
    author: "Winston Churchill",
    date: "2025-04-18"
  },
  {
    phrase: "Nunca sabrás lo fuerte que eres, hasta que ser fuerte sea tu única opción.",
    author: "Bob Marley",
    date: "2025-04-19"
  },
  {
    phrase: "El dolor que sientes hoy será la fuerza que sentirás mañana.",
    author: "Desconocido",
    date: "2025-04-20"
  },
  {
    phrase: "La vida no es esperar a que pase la tormenta, es aprender a bailar bajo la lluvia.",
    author: "Vivian Greene",
    date: "2025-04-21"
  },
  {
    phrase: "Cada logro comienza con la decisión de intentarlo.",
    author: "Gail Devers",
    date: "2025-04-22"
  },
  {
    phrase: "Los sueños no tienen fecha de caducidad.",
    author: "Lupita Nyong'o",
    date: "2025-04-23"
  },
  {
    phrase: "El único modo de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
    date: "2025-04-24"
  },
  {
    phrase: "La motivación es lo que te hace empezar. El hábito es lo que te hace continuar.",
    author: "Jim Ryun",
    date: "2025-04-25"
  },
  {
    phrase: "El futuro depende de lo que hagas hoy.",
    author: "Mahatma Gandhi",
    date: "2025-04-26"
  },
  {
    phrase: "Todo lo que necesitas ya está dentro de ti.",
    author: "Desconocido",
    date: "2025-04-27"
  },
  {
    phrase: "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    author: "Vidal Sassoon",
    date: "2025-04-28"
  },
  {
    phrase: "El éxito no es definitivo, el fracaso no es fatal: lo que cuenta es el coraje para continuar.",
    author: "Winston Churchill",
    date: "2025-04-29"
  },
  {
    phrase: "No te rindas, cada fracaso es una oportunidad para empezar de nuevo con más inteligencia.",
    author: "Henry Ford",
    date: "2025-04-30"
  },
  {
    phrase: "Tú eres el único responsable de tu felicidad.",
    author: "Desconocido",
    date: "2025-05-01"
  },
  {
    phrase: "Cualquiera que deje de aprender es viejo, ya sea a los veinte o a los ochenta.",
    author: "Henry Ford",
    date: "2025-05-02"
  },
  {
    phrase: "El éxito consiste en ir de fracaso en fracaso sin perder el entusiasmo.",
    author: "Winston Churchill",
    date: "2025-05-03"
  },
  {
    phrase: "La vida es un 10% lo que nos pasa y un 90% cómo reaccionamos ante ello.",
    author: "Charles R. Swindoll",
    date: "2025-05-04"
  },
  {
    phrase: "La verdadera motivación proviene de lograr cosas que nunca imaginaste que podrías hacer.",
    author: "Desconocido",
    date: "2025-05-05"
  }
]
  