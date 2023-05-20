type Props = {
    currentStep:number
}

const steps = [
    {id:1, label:'Shipping address'},
    {id:2, label:'Review your order'},
    {id:3, label:'Payment details'},
]

export default function CheckoutSteps(props:Props) {
    const {currentStep} = props
    
    return (
        <ul className="steps w-full">
            {
                steps.map(step=>{
                    return (
                        <li key={step.id} className={`step ${(currentStep >= step.id) && 'step-primary'}`}>{step.label}</li>
                    )
                })
            }
        </ul>
    )
}