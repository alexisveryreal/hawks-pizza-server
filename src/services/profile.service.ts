import { CreateProfileDto } from '@/dtos/profile.dto';
import { HttpException } from '@/exceptions/HttpException';
import { Profile } from '@/interfaces/profile.interface';
import profileModel from '@/models/profile.model';
import { isEmpty } from '@/utils/isEmpty';

class ProfileService {
  public profile = profileModel;

  public async findAllProfiles(): Promise<Profile[]> {
    const profiles: Profile[] = await this.profile.find();
    return profiles;
  }

  public async findByProfileID(profileId: string): Promise<Profile> {
    if (isEmpty(profileId)) throw new HttpException(400, 'profileID is missing!');

    const findProfile: Profile = await this.profile.findOne({ _id: profileId });
    if (!findProfile) throw new HttpException(409, "You're not this profile!");

    return findProfile;
  }

  public async createProfile(profileData: CreateProfileDto): Promise<Profile> {
    if (isEmpty(profileData)) throw new HttpException(400, 'Missing profile data');

    const findProfile: Profile = await this.profile.findOne({ email: profileData.email });
    if (findProfile) throw new HttpException(409, `Your email ${profileData.email} already exists`);

    const createProfileData: Profile = await this.profile.create({ ...profileData });

    return createProfileData;
  }

  public async updateProfile(profileId: string, profileData: CreateProfileDto): Promise<Profile> {
    if (isEmpty(profileData)) throw new HttpException(400, 'Missing profile data');

    console.log('passed in profile data: ', profileData);

    if (profileData.email) {
      const findProfile: Profile = await this.profile.findOne({ email: profileData.email });
      if (findProfile && findProfile._id != profileId) throw new HttpException(409, `You're email ${profileData.email} already exists`);
    }

    const oldProfile = await this.profile.findById(profileId);

    oldProfile.email = profileData.email;
    oldProfile.gender = profileData.gender;
    oldProfile.username = profileData.username;
    await oldProfile.save();

    const updateProfileById: Profile = oldProfile;

    if (!updateProfileById) throw new HttpException(409, "You're not this profile!");

    return updateProfileById;
  }

  public async deleteProfile(profileId: string): Promise<Profile> {
    const deleteProfileById: Profile = await this.profile.findByIdAndDelete(profileId);
    if (!deleteProfileById) throw new HttpException(409, "You're not this profile!");

    return deleteProfileById;
  }
}

export default ProfileService;
