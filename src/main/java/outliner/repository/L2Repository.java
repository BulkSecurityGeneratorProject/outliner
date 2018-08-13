package outliner.repository;

import org.springframework.stereotype.Repository;

import outliner.advanced.core.data.OutlinerRepository;
import outliner.domain.L2;


/**
 * Spring Data  repository for the L2 entity.
 */
@Repository
public interface L2Repository extends OutlinerRepository<L2, Long> {

}
