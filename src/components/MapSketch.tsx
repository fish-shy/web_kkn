/**
 * Sketsa peta wilayah — ilustrasi orientasi, bukan peta berskala.
 * Ganti berkas `public/map.png` bila sudah ada peta resmi kelurahan.
 */
export function MapSketch() {
  return (
    <img
      src="/map.png"
      alt="Sketsa posisi Kelurahan Landasan Ulin Tengah beserta wilayah di sekitarnya"
      className="map-sketch"
      width={816}
      height={260}
      loading="lazy"
      decoding="async"
    />
  )
}
