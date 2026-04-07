export const COLECCIONES_INTERACTIVAS = [
  'Mouse',
  'T_Projects',
  'Calendario',
  'T_About_Me',
  'Libros2',
  'Libros',
  'Cuadro_2',
  'Cuadro',
  'Nintendo',
  'F_Amarilla',
  'F_Roja',
  'F_Purpura',
  'F_Azul',
  'Control_Nintendo',
  'L_github',
  'L_linkedin',
  'L_ig',
  'Sandalia',
  'Sandalia2',
  'Poster',
  'Cara_Creeper',
  'Cara_Enderman',
  'Cara_Enderman2',
  'Audifonos',
  'Bafles',
  'Bafles2',
  'Palitos_olor',
  'Logo_Valorant',
  'Cactus',
  'Pogo',
  'Camara',
  'Inventario',
  'Taza_Lapiz',
  'tablet',
  'PC',
  'PC.001',
  'Cube057',
  'Cube057_1',
  'Cube057_2',
  'Cube057_3'
]

export const NOMBRES_AMIGABLES = {
  L_github: 'GitHub',
  L_linkedin: 'LinkedIn',
  L_ig: 'Instagram',
  T_Projects: 'Proyectos',
  T_About_Me: 'Sobre mí',
  PC: 'Computador',
  'PC.001': 'Computador',
  Cube057: 'Silla',
  Cube057_1: 'Silla',
  Cube057_2: 'Silla',
  Cube057_3: 'Silla'
}

export const URLS_REDES = {
  L_ig: 'https://www.instagram.com/frismolab/',
  L_linkedin:
    'https://www.linkedin.com/in/sergio-andr%C3%A9s-rangel-monta%C3%B1a-ba55b9345/',
  L_github: 'https://github.com/231273214'
}

export const COMPORTAMIENTOS = {
  patronLuces: { hover: 'ninguno', click: 'ninguno' },

  L_github: { hover: 'girarElevar', click: 'url' },
  L_linkedin: { hover: 'girarElevar', click: 'url' },
  L_ig: { hover: 'girarElevar', click: 'url' },

  Camara: { hover: 'ninguno', click: 'cv' },
  PC: {hover:'ninguo', click: 'ninguno'},
  Control_Nintendo: { hover: 'girarElevar', click: 'ninguno' },
  Nintendo: { hover: 'girarElevar', click: 'ninguno' },
  Logo_Valorant: { hover: 'girarElevar', click: 'ninguno' },
  Palitos_olor: { hover: 'girarElevar', click: 'ninguno' },
  Pogo: { hover: 'girarElevar', click: 'ninguno' },
  F_Amarilla: { hover: 'girarElevar', click: 'ninguno' },
  F_Azul: { hover: 'girarElevar', click: 'ninguno' },
  F_Roja: { hover: 'girarElevar', click: 'ninguno' },
  F_Purpura: { hover: 'girarElevar', click: 'ninguno' },
  tablet: { hover: 'girarElevar', click: 'assets' },
  Mouse: { hover: 'girarElevar', click: 'ninguno' },
  Taza_Lapiz: { hover: 'girarElevar', click: 'video' },
  Audifonos: { hover: 'girarElevar', click: 'ninguno' },
  Sandalia: { hover: 'girarElevar', click: 'ninguno' },
  Sandalia2: { hover: 'girarElevar', click: 'ninguno' },
  Inventario: { hover: 'girarElevar', click: 'ninguno' },
  Libros: { hover: 'girarElevar', click: 'video' },
  Libros2: { hover: 'girarElevar', click: 'ninguno' },
  Cara_Creeper: { hover: 'girarElevar', click: 'video' },
  Cara_Enderman: { hover: 'girarElevar', click: 'ninguno' },
  Cara_Enderman2: { hover: 'girarElevar', click: 'ninguno' },

  Bafles: { hover: 'onda', click: 'musica' },
  Bafles2: { hover: 'onda', click: 'musica' },

  Calendario: { hover: 'girarElevar', click: 'calendario' },

  Cuadro: { hover: 'saltar', click: 'ninguno' },
  Cuadro_2: { hover: 'saltar', click: 'ninguno' },
  Cactus: { hover: 'saltar', click: 'ninguno' },

  PC: { hover: 'ninguno', click: 'ninguno' },
  'PC.001': { hover: 'ninguno', click: 'ninguno' },

  T_Projects: { hover: 'ninguno', click: 'proyectos' },
  T_About_Me: { hover: 'ninguno', click: 'about' },

  Cube057: { hover: 'ninguno', click: 'ninguno' },
  Cube057_1: { hover: 'ninguno', click: 'ninguno' },
  Cube057_2: { hover: 'ninguno', click: 'ninguno' },
  Cube057_3: { hover: 'ninguno', click: 'ninguno' }
}

export function obtenerComportamiento(nombre) {
  if (COMPORTAMIENTOS[nombre]) return COMPORTAMIENTOS[nombre]
  if (nombre && nombre.startsWith('Luz')) return COMPORTAMIENTOS.patronLuces
  return { hover: 'ninguno', click: 'ninguno' }
}

export function marcarInteractivos(scene) {
  if (!scene) return

  scene.traverse((node) => {
    if (node.isGroup && COLECCIONES_INTERACTIVAS.includes(node.name)) {
      node.userData.isInteractive = true
      node.userData.collectionName = node.name
    }

    if (node.isMesh && COLECCIONES_INTERACTIVAS.includes(node.name)) {
      node.userData.isInteractive = true
      node.userData.collectionName = node.name
    }
  })
}