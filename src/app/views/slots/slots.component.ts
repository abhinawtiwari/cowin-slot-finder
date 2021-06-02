import { Component, OnInit } from '@angular/core';
import { SlotServiceService } from 'src/app/services/slot-service.service';
import { find as _find, isEmpty as _isEmpty, get as _get } from 'lodash';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent implements OnInit {
  availableCenters: {}[] = [];
  showMessages: any = [];

  constructor(private slotServiceService: SlotServiceService) {}

  ngOnInit(): void {
    this.findForSunflower();
    // this.findForFriend();
  }

  findForSunflower() {
    const dates = [
      '31-05-2021',
      '01-06-2021', '02-06-2021', '03-06-2021',
      '04-06-2021', '05-06-2021', '06-06-2021',
      '07-06-2021', '08-06-2021', '09-06-2021',
      '10-06-2021', '11-06-2021', '12-06-2021',
      '13-06-2021', '14-06-2021', '15-06-2021',
      '16-06-2021'
    ];
    dates.map(date => {
      this.slotServiceService.findByDistrictSunflower(date).subscribe(
        (response) => {
          // console.log(response);
          this.findAvailability(response.sessions, 'Lopa');
        },
        (err) => {
          console.log(err);
        }
      );
    })
    
    setInterval(() => {
      dates.map(date => {
        this.slotServiceService.findByDistrictSunflower(date).subscribe(
          (response) => {
            // console.log(response);
            this.findAvailability(response.sessions, 'lopa');
          },
          (err) => {
            console.log(err);
          }
        );
      })
    }, 1000 * 60 * 5 + 5000);
  }

  findForFriend() {
    const dates = [
      '31-05-2021',
      '01-06-2021', '02-06-2021', '03-06-2021',
      '04-06-2021', '05-06-2021', '06-06-2021',
      '07-06-2021', '08-06-2021', '09-06-2021',
      '10-06-2021', '11-06-2021', '12-06-2021',
      '13-06-2021', '14-06-2021', '15-06-2021',
      '16-06-2021'
    ];
    dates.map(date => {
      this.slotServiceService.findByDistrictForFriend(date).subscribe(
        (response) => {
          // console.log(response);
          this.findAvailability(response.sessions, 'arunima');
        },
        (err) => {
          console.log(err);
        }
      );
    })
    
    setInterval(() => {
      dates.map(date => {
        this.slotServiceService.findByDistrictForFriend(date).subscribe(
          (response) => {
            // console.log(response);
            this.findAvailability(response.sessions, 'arunima');
          },
          (err) => {
            console.log(err);
          }
        );
      })
    }, 1000 * 60 * 5 + 5000);
  }

  findAvailability(sessions: any, person: string) {
    let centers = sessions;
    const centersNot45 = centers.filter(
      (center: { min_age_limit: number }) => center.min_age_limit !== 45
    );
    const centers18 = centers.filter(
      (center: any) => center.min_age_limit === 18 && center.available_capacity_dose1 !== 0
    );
    const centers45 = centers.filter(
      (center: { min_age_limit: number }) => center.min_age_limit === 45
    );

    // if (!_isEmpty(centers45)) {
    //   console.log('found 45+ centers for ', person);
    //   let filteredCenters45: {}[] = [];
    //   centers45.map(
    //     (center: {
    //       name: any;
    //       address: any;
    //       available_capacity_dose1: any;
    //     }) => {
    //       let obj = {
    //         name: '',
    //         address: '',
    //         available_capacity_dose1: 0,
    //       };
    //       obj.name = center.name;
    //       obj.address = center.address;
    //       obj.available_capacity_dose1 = center.available_capacity_dose1;
    //       filteredCenters45.push(obj);
    //     }
    //   );
    //   this.sendMailMessage(filteredCenters45, '45+', person);
    // }

    if (!_isEmpty(centers18)) {
      console.log('found 18+ centers for ', person);
      let filteredCenters: {}[] = [];
      centers18.map(
        (center: {
          name: any;
          address: any;
          available_capacity_dose1: any;
          date: any
        }) => {
          let obj = {
            name: '',
            address: '',
            available_capacity_dose1: 0,
            date: null
          };
          obj.name = center.name;
          obj.address = center.address;
          obj.available_capacity_dose1 = center.available_capacity_dose1;
          obj.date = center.date;
          filteredCenters.push(obj);
        }
      );
      this.sendMailMessage(filteredCenters, '18+', person);
    }
  }

  sendMailMessage(filteredCenters: {}[], ageGroup: string, person: string) {
    console.log('Communicate for ', ageGroup, ' to ', person);
    this.showMessages.push(`${new Date()} Communicate for ${ageGroup} to ${person}`);
    // if (person === 'sunflower') {
    //   // send message to sunflower
    // }
    console.table(filteredCenters);
  }
}

