'use client';

import BodyIndex from '@components/common/BodyIndex';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import clsx from 'clsx';
import React from 'react';
enum LevelExEnum {
  Less = 0,
  Normal = 1,
  Fit = 2,
  Pretty = 3,
  Manny = 4
}
enum SpeedChangeWeightEnum {
  Slow = 'slow',
  Normal = 'normal',
  Fast = 'fast;'
}
export default function Home() {
  const [age, setAge] = React.useState<number>(23);
  const [height, setHeight] = React.useState<number>(100);
  const [weight, setWeight] = React.useState<number>(20);
  const [expectedWeight, setExpectedWeight] = React.useState<number>(55);
  const [levelExercise, setLevelExercise] = React.useState<LevelExEnum>(LevelExEnum.Less);
  const [speedChangeWeight, setSpeedChangeWeight] = React.useState<SpeedChangeWeightEnum>(SpeedChangeWeightEnum.Normal);
  const handleChangeAge = (e: A) => {
    if (Number(e.target.value) > 99) {
      setAge(99);
    } else {
      setAge(Number(e.target.value));
    }
  };
  const handleChangeHeight = (e: A) => {
    if (Number(e.target.value) > 200) {
      setHeight(200);
    } else {
      setHeight(Number(e.target.value));
    }
  };
  const handleChangeWeight = (e: A) => {
    setWeight(Number(e.target.value));
  };
  const renderExerciseIntensity = () => {
    switch (levelExercise) {
      case LevelExEnum.Less:
        return 'Ít hoạt động, chỉ ăn đi làm về ngủ';
      case LevelExEnum.Normal:
        return 'Có tập nhẹ nhàng, tuần 1-3';
        break;
      case LevelExEnum.Fit:
        return 'Có vận động vừa 4-5 buổi';
        break;
      case LevelExEnum.Pretty:
        return 'Vận động nhiều 6-7 buổi';
        break;
      case LevelExEnum.Manny:
        return 'Vận động rất nhiều ngày tập 2 lần';
      default:
        break;
    }
  };
  return (
    <main className='flex flex-row min-h-screen justify-between p-12'>
      <aside className='flex-[2_2_0%] border-4 border-blue-300 rounded-lg p-5 box-content'>
        <h2 className='text-3xl font-bold text-blue-500'>TDEE là gì? Tính TDEE giảm cân lành mạnh</h2>
        <div>
          <p>
            TDEE (Total Daily Energy Expenditure) là tất cả năng lượng cần thiết cho hoạt động mỗi ngày của bạn. Tính
            TDEE giúp bạn đạt được mục tiêu dinh dưỡng (giảm cân, tăng cân) của bạn. Xác định chỉ số TDEE sẽ giúp bạn
            biết rõ lượng calo nên tăng hoặc giảm để đạt hiệu quả cutting (giảm cân) hay bulking (tăng cân). Nói cách
            khác, TDEE giúp cân bằng năng lượng để đạt được hiệu quả giảm cân nhưng không gây ra những tác động tiêu cực
            đến sức khỏe.
          </p>
          <br />
          <p>
            Tính TDEE giảm cân giúp chúng ta phân biệt được một cách tương đối năng lượng của thực phẩm hay năng lượng
            cần thiết để duy trì hoạt động. Từ đó xây dựng cho mình một chế độ ăn phù hợp với bản thân.
          </p>
          <br />
          <p>
            Tại sao bạn cần phải tính calo? Chúng ta thường không để ý xem mình đã ăn bao nhiêu trong một bữa dù việc
            này rất cần thiết, đặc biệt đối với những bạn muốn giảm cân.
          </p>
          <br />
          Chúng ta vẫn luôn nghĩ rằng chỉ cần ăn ít hơn bình thường là đã có thể giảm được cân rồi. Điều này không sai,
          nhưng có thể dẫn đến việc thiếu những chất cần thiết dành cho cơ thể.
          <p>
            Vì thế khi ăn, đặc biệt là khi giảm cân, bạn nên tính cho mình một lượng calo cần thiết nạp vào cơ thể trong
            một ngày. Việc này không chỉ giúp bạn kiểm soát được lượng ăn mà còn có thể chia khẩu phần ăn sao cho đủ
            chất. Bạn cũng có thể chia ra thành nhiều bữa ăn trong một ngày nhưng vẫn dựa trên tổng lượng calo đã tính.
          </p>
          <br />
          <p>
            Hoặc bạn cũng có thể liên hệ với chúng mình về eat clean, ăn kiêng healthy, giảm cân tự nhiên hay chỉ đơn
            giản là ăn uống lành mạnh hơn để hiệu quả và an toàn nhé!
          </p>
        </div>
      </aside>
      <section className='flex-[3_3_0%] p-5'>
        <h1 className='text-3xl font-bold text-blue-500 py-2'>CÔNG CỤ TÍNH TDEE ONLINE</h1>
        <p>Tính lượng calo cần thiết cho cơ thể mỗi ngày</p>
        <p>Cho chúng mình xin vài thông tin để tính TDEE cho bạn nhé.</p>
        <section className='flex gap-x-10 mt-5'>
          <div>
            <h2 className='font-bold text-blue-500 text-xl mb-2'>Mục Tiêu</h2>
            <Select>
              <SelectTrigger className='w-[180px]'>
                <SelectValue defaultChecked={true} defaultValue={'decrease'} placeholder='Select target' />
              </SelectTrigger>
              <SelectContent defaultValue={'decrease'}>
                <SelectItem id='decrease' value='decrease'>
                  Giảm mỡ
                </SelectItem>
                <SelectItem value='increase'>Tăng cân</SelectItem>
                <SelectItem value='balance'>Duy trì</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2 className='font-bold text-blue-500 text-xl mb-2'>Giới tính</h2>
            <RadioGroup className='flex py-2' defaultValue='man'>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='man' id='man' />
                <Label htmlFor='man'>Nam</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='woman' id='woman' />
                <Label htmlFor='woman'>Nữ</Label>
              </div>
            </RadioGroup>
          </div>
        </section>
        <section className='flex justify-between mt-5 '>
          <BodyIndex title='Tuổi' unit='(Năm)' value={age} handleChangeInput={handleChangeAge} setValue={setAge} />
          <BodyIndex
            title='Chiều cao'
            unit='(Cm)'
            value={height}
            handleChangeInput={handleChangeHeight}
            setValue={setHeight}
          />
          <BodyIndex
            title='Cân nặng'
            unit='(Kg)'
            value={weight}
            handleChangeInput={handleChangeWeight}
            setValue={setWeight}
          />
        </section>
        <section className='mt-5'>
          <h2 className='font-bold text-blue-500 mb-2 text-xl'>CƯỜNG ĐỘ TẬP LUYỆN</h2>
          <div className='flex gap-x-4'>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <Button
                  onClick={() => setLevelExercise(index)}
                  className={clsx(
                    'min-w-16 hover:bg-blue-100 hover:text-blue-500 hover:border-blue-500',
                    index === levelExercise ? 'bg-blue-100 text-blue-500 border-blue-500' : ''
                  )}
                  variant='outline'
                  key={index}
                >
                  {index}
                </Button>
              ))}
          </div>
          <span className='text-red-400 inline-block mt-2'>{renderExerciseIntensity()}</span>
        </section>
        <section className='flex gap-x-20 mt-5'>
          <div>
            <h2 className='font-bold text-blue-500 text-xl mb-2'>Cân nặng mục tiêu</h2>
            <Input
              className='expected-w'
              onChange={e => setExpectedWeight(Number(e.target.value))}
              value={expectedWeight}
              type='number'
            />
          </div>
          <div>
            <h2 className='font-bold text-blue-500 text-xl mb-2'>Tốc độ giảm cân</h2>
            <Select defaultOpen={true} value={speedChangeWeight}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue defaultChecked={true} defaultValue={'slow'} />
              </SelectTrigger>
              <SelectContent defaultValue={'normal'}>
                <SelectItem id='slow' value='slow'>
                  Chậm
                </SelectItem>
                <SelectItem id='normal' value='normal'>
                  Bình thường
                </SelectItem>
                <SelectItem id='fast' value='fast'>
                  Nhanh
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>
      </section>
    </main>
  );
}
