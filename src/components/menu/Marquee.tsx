export default function Marquee() {
  return (
    <>
      <div className='relative flex overflow-x-hidden'>
        <div className='py-12 animate-marquee whitespace-nowrap'>
          <span className='mx-4 text-4xl'>Achète un produit partenaire -</span>
          <span className='mx-4 text-4xl'>Reçoit de la crypto -</span>
          <span className='mx-4 text-4xl'>Upgrade ton event -</span>
          <span className='mx-4 text-4xl'>Experience immersive -</span>
          <span className='mx-4 text-4xl'>LFG -</span>
        </div>

        <div className='absolute top-0 py-12 animate-marquee2 whitespace-nowrap'>
          <span className='mx-4 text-4xl'>Achète un produit partenaire -</span>
          <span className='mx-4 text-4xl'>Reçoit de la crypto -</span>
          <span className='mx-4 text-4xl'>Upgrade ton event -</span>
          <span className='mx-4 text-4xl'>Experience immersive -</span>
          <span className='mx-4 text-4xl'>LFG -</span>
        </div>
      </div>
    </>
  )
}
